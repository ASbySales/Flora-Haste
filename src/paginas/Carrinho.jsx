import { useState, useEffect } from 'react'
import { supabase, TENANT_ID, WHATSAPP_NUMBER } from '../lib/supabase'
import logoFloraHaste from '../assets/logo-flora-haste.jpg'
import { Calendar, Clock, MessageSquare, Trash2, ArrowLeft, Send } from 'lucide-react'

export default function Carrinho({ carr, itens, setItens, opcionaisData }) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [nome, setNome] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [dataEntrega, setDataEntrega] = useState(() => {
        const hoje = new Date()
        return hoje.toISOString().split('T')[0]
    })
    const [horarioEntrega, setHorarioEntrega] = useState('Tarde (13h às 18h)')
    const [observacoes, setObservacoes] = useState('')
    const [honeypot, setHoneypot] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [erroEnvio, setErroEnvio] = useState('')

    // Carrega dados salvos no localStorage
    useEffect(() => {
        setNome(localStorage.getItem('flora_cliente_nome') || '')
        setWhatsapp(localStorage.getItem('flora_cliente_whatsapp') || '')
    }, [])

    // Cálculo do valor individual de cada item com seus mimos/adicionais
    const calcularPrecoItem = (item) => {
        let valorBase = parseFloat(String(item.produto?.valor || 0).replace(',', '.'))
        let qtdPrincipal = item.quantidade || 1
        let total = valorBase * qtdPrincipal

        Object.entries(item.opcionais || {}).forEach(([idStr, qtd]) => {
            const id = parseInt(idStr)
            const opc = (opcionaisData || []).find(o => o.id === id)
            if (opc && qtd > 0) {
                let valorOpc = parseFloat(String(opc.valor || 0).replace(',', '.'))
                total += qtd * valorOpc
            }
        })
        return total
    }

    const calcularTotalGeral = () => {
        return itens.reduce((soma, item) => soma + calcularPrecoItem(item), 0)
    }

    const removerItem = (idEscolha) => {
        setItens(prev => prev.filter(item => item.idEscolha !== idEscolha))
    }

    const alterarQtdPrincipal = (idEscolha, direcao) => {
        setItens(prev => prev.map(item => {
            if (item.idEscolha !== idEscolha) return item
            const qtdAtual = item.quantidade || 1
            const novaQtd = direcao === 'mais' ? qtdAtual + 1 : Math.max(1, qtdAtual - 1)
            return { ...item, quantidade: novaQtd }
        }))
    }

    const handleWhatsappChange = (e) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length > 11) value = value.slice(0, 11)
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`
        } else if (value.length > 0) {
            value = `(${value}`
        }
        setWhatsapp(value)
    }

    const handleFinalizarPedido = async (e) => {
        e.preventDefault()
        setErroEnvio('')

        if (honeypot) return

        if (!nome.trim()) {
            setErroEnvio('Por favor, informe seu nome.')
            return
        }

        const apenasNumeros = whatsapp.replace(/\D/g, '')
        if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
            setErroEnvio('Informe um WhatsApp válido com DDD.')
            return
        }

        if (itens.length === 0) {
            setErroEnvio('Sua sacola está vazia.')
            return
        }

        try {
            setEnviando(true)

            // Monta o payload de itens com parent_item_index baseado em 1 (conforme exigido pela RPC da AS Gestão)
            const payloadItens = []
            for (const item of itens) {
                const servicoId = parseInt(item.produto?.id, 10)
                if (!servicoId || isNaN(servicoId)) {
                    throw new Error(`Item sem identificador válido.`)
                }

                // Índice baseado em 1 do item pai
                const parentIndex1Based = payloadItens.length + 1
                payloadItens.push({
                    servico_id: servicoId,
                    quantidade: Number(item.quantidade) || 1,
                    parent_item_index: null
                })

                Object.entries(item.opcionais || {}).forEach(([opcId, qtd]) => {
                    const idNum = parseInt(opcId, 10)
                    const qtdNum = Number(qtd) || 0
                    if (!isNaN(idNum) && idNum > 0 && qtdNum > 0) {
                        payloadItens.push({
                            servico_id: idNum,
                            quantidade: qtdNum,
                            parent_item_index: parentIndex1Based
                        })
                    }
                })
            }

            // Grava atômica via RPC no banco da AS Gestão
            const { data: pedidoCriado, error: erroRPC } = await supabase.rpc('criar_agendamento_publico_tenant', {
                p_tenant_id: TENANT_ID,
                p_nome_cliente: nome.trim(),
                p_whatsapp_cliente: whatsapp,
                p_data_agendamento: dataEntrega || null,
                p_horario_agendamento: horarioEntrega || null,
                p_observacoes: observacoes?.trim() || null,
                p_itens: payloadItens
            })

            if (erroRPC) throw erroRPC

            // Salva dados no cache local da cliente para facilidade futura
            localStorage.setItem('flora_cliente_nome', nome.trim())
            localStorage.setItem('flora_cliente_whatsapp', whatsapp)

            // Monta texto formatado para o WhatsApp da Flora Haste
            const pedidoId = pedidoCriado?.id || 'NOVO'
            let msg = `🌸 *NOVO PEDIDO - FLORA HASTE* (Nº #${pedidoId})\n\n`
            msg += `👤 *Cliente:* ${nome.trim()}\n`
            msg += `📱 *WhatsApp:* ${whatsapp}\n`
            msg += `📅 *Data de Entrega/Retirada:* ${dataEntrega.split('-').reverse().join('/')}\n`
            msg += `⏰ *Período:* ${horarioEntrega}\n\n`
            msg += `📋 *ITENS DO PEDIDO:*\n`

            itens.forEach((it, idx) => {
                msg += `\n${idx + 1}. *${it.produto?.nome}* (x${it.quantidade || 1}) - R$ ${it.produto?.valor}`
                const opcs = Object.entries(it.opcionais || {})
                if (opcs.length > 0) {
                    opcs.forEach(([idStr, qtd]) => {
                        const o = (opcionaisData || []).find(x => x.id === parseInt(idStr))
                        if (o) msg += `\n   └ + ${o.nome} (x${qtd}) - R$ ${o.valor}`
                    })
                }
            })

            const totalFormatado = calcularTotalGeral().toFixed(2).replace('.', ',')
            msg += `\n\n💰 *VALOR TOTAL: R$ ${totalFormatado}*`

            if (observacoes.trim()) {
                msg += `\n\n💌 *Mensagem do Cartão / Obs:* \n"${observacoes.trim()}"`
            }

            msg += `\n\n_Aguardando confirmação de entrega e pagamento._`

            // Limpa a sacola e fecha modal
            setItens([])
            carr()

            // Abre o WhatsApp com o pedido formatado
            const urlWhats = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
            window.open(urlWhats, '_blank')

        } catch (error) {
            console.error('Erro ao registrar pedido:', error)
            setErroEnvio(error.message || 'Não foi possível enviar o pedido. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    const totalFormatado = calcularTotalGeral().toFixed(2).replace('.', ',')

    return (
        <div 
            onClick={carr}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 animate-fadeIn'
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className='w-full max-w-[380px] bg-white rounded-3xl p-4 shadow-2xl overflow-hidden border border-[#F9E6EE] flex flex-col max-h-[92vh]'
            >
                {/* Header da Sacola */}
                <div className='flex items-center justify-between border-b border-gray-100 pb-3'>
                    <div className='flex items-center gap-2'>
                        {mostrarFormulario && (
                            <button 
                                type="button"
                                onClick={() => setMostrarFormulario(false)}
                                className='h-8 w-8 rounded-full bg-[#FFF8FA] text-[#D14D7C] flex items-center justify-center cursor-pointer border border-[#F9E6EE]'
                            >
                                <ArrowLeft className='w-4 h-4' />
                            </button>
                        )}
                        <h2 className='text-base font-bold text-gray-800 font-cinzel'>
                            {mostrarFormulario ? 'Finalizar Pedido' : 'Sua Sacola'}
                        </h2>
                    </div>
                    <button 
                        type="button"
                        onClick={carr} 
                        className='h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 flex items-center justify-center font-bold cursor-pointer border-none'
                    >
                        ✕
                    </button>
                </div>

                {/* Conteúdo Dinâmico: Lista de Itens OU Formulário de Finalização */}
                <div className='flex-1 overflow-y-auto no-scrollbar py-3'>
                    {!mostrarFormulario ? (
                        /* VISUALIZAÇÃO 1: LISTA DE ITENS NA SACOLA */
                        itens.length === 0 ? (
                            <div className='py-12 flex flex-col items-center justify-center text-center gap-2'>
                                <img src={logoFloraHaste} className='w-16 h-16 rounded-full opacity-60 mb-2 object-cover' />
                                <p className='text-sm font-semibold text-gray-700 font-cinzel'>Sua sacola está vazia</p>
                                <p className='text-xs text-gray-400 max-w-[200px]'>Escolha seus buquês e presentes no catálogo floral.</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3'>
                                {itens.map((it) => (
                                    <div key={it.idEscolha} className='bg-[#FFF8FA] border border-[#F9E6EE] rounded-2xl p-3 flex flex-col gap-2 shadow-3xs'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2.5 min-w-0 pr-2'>
                                                <img 
                                                    src={it.produto?.img || logoFloraHaste} 
                                                    className='w-12 h-12 rounded-xl object-cover border border-[#F9E6EE] shrink-0' 
                                                />
                                                <div className='flex flex-col text-left truncate'>
                                                    <span className='font-bold text-xs text-gray-800 truncate'>{it.produto?.nome}</span>
                                                    <span className='text-xs font-semibold text-[#D14D7C]'>
                                                        R$ {it.produto?.valor}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-2 shrink-0'>
                                                {/* Controle de Qtd */}
                                                <div className='flex items-center bg-white border border-gray-200 rounded-lg px-1'>
                                                    <button 
                                                        type="button"
                                                        onClick={() => alterarQtdPrincipal(it.idEscolha, 'menos')}
                                                        className='h-6 w-5 flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer'
                                                    >
                                                        -
                                                    </button>
                                                    <span className='text-xs font-bold px-1'>{it.quantidade || 1}</span>
                                                    <button 
                                                        type="button"
                                                        onClick={() => alterarQtdPrincipal(it.idEscolha, 'mais')}
                                                        className='h-6 w-5 flex items-center justify-center text-xs font-bold text-gray-500 cursor-pointer'
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button 
                                                    type="button"
                                                    onClick={() => removerItem(it.idEscolha)}
                                                    className='text-red-400 hover:text-red-600 p-1 cursor-pointer'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Opcionais vinculados a esse item */}
                                        {Object.keys(it.opcionais || {}).length > 0 && (
                                            <div className='border-t border-[#F9E6EE] pt-2 flex flex-col gap-1 pl-2'>
                                                <span className='text-[10px] font-bold text-[#4E7A52] uppercase tracking-wider'>
                                                    Mimos adicionados:
                                                </span>
                                                {Object.entries(it.opcionais).map(([opcId, qtd]) => {
                                                    const o = (opcionaisData || []).find(x => x.id === parseInt(opcId))
                                                    if (!o || qtd <= 0) return null
                                                    return (
                                                        <div key={opcId} className='flex items-center justify-between text-[11px] text-gray-600'>
                                                            <span>• {o.nome} (x{qtd})</span>
                                                            <span className='font-semibold text-gray-700'>+ R$ {o.valor}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        /* VISUALIZAÇÃO 2: FORMULÁRIO DE ENTREGA & IDENTIFICAÇÃO */
                        <form onSubmit={handleFinalizarPedido} className='flex flex-col gap-3 py-1 text-left'>
                            {/* Honeypot anti-bot */}
                            <input 
                                type="text" 
                                value={honeypot} 
                                onChange={e => setHoneypot(e.target.value)} 
                                className="hidden" 
                                tabIndex="-1" 
                                autoComplete="off" 
                            />

                            <div>
                                <label className='block text-xs font-bold text-gray-700 mb-1'>Seu Nome Completo:</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={nome} 
                                    onChange={e => setNome(e.target.value)}
                                    placeholder="Ex: Maria Silva"
                                    className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D14D7C] focus:bg-white'
                                />
                            </div>

                            <div>
                                <label className='block text-xs font-bold text-gray-700 mb-1'>Seu WhatsApp:</label>
                                <input 
                                    type="tel" 
                                    required 
                                    value={whatsapp} 
                                    onChange={handleWhatsappChange}
                                    placeholder="(83) 9 9999-9999"
                                    className='w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D14D7C] focus:bg-white'
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <label className='block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1'>
                                        <Calendar className='w-3 h-3 text-[#D14D7C]' /> Data Entrega:
                                    </label>
                                    <input 
                                        type="date" 
                                        required 
                                        min={new Date().toISOString().split('T')[0]}
                                        value={dataEntrega} 
                                        onChange={e => setDataEntrega(e.target.value)}
                                        className='w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D14D7C]'
                                    />
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1'>
                                        <Clock className='w-3 h-3 text-[#D14D7C]' /> Período:
                                    </label>
                                    <select 
                                        value={horarioEntrega} 
                                        onChange={e => setHorarioEntrega(e.target.value)}
                                        className='w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D14D7C]'
                                    >
                                        <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                                        <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                                        <option value="Comercial (08h às 18h)">Comercial (08h às 18h)</option>
                                        <option value="Retirada na Loja">Retirada na Loja</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className='block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1'>
                                    <MessageSquare className='w-3 h-3 text-[#4E7A52]' /> Mensagem do Cartão / Obs:
                                </label>
                                <textarea 
                                    rows="2"
                                    value={observacoes} 
                                    onChange={e => setObservacoes(e.target.value)}
                                    placeholder="Escreva a dedicatória do cartão ou endereço de entrega..."
                                    className='w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#D14D7C] focus:bg-white resize-none'
                                />
                            </div>

                            {erroEnvio && (
                                <p className='text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100'>
                                    ⚠️ {erroEnvio}
                                </p>
                            )}

                            <button 
                                type="submit"
                                disabled={enviando}
                                className='w-full h-12 mt-1 bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white font-bold text-sm rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-none'
                            >
                                <Send className='w-4 h-4' />
                                {enviando ? 'Enviando Pedido...' : 'Enviar Pedido pelo WhatsApp'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer com Total e Botão de Ação */}
                {!mostrarFormulario && itens.length > 0 && (
                    <div className='border-t border-gray-100 pt-3 flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs text-gray-500 font-semibold'>Subtotal estimado:</span>
                            <span className='text-lg font-bold text-[#D14D7C]'>R$ {totalFormatado}</span>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setMostrarFormulario(true)}
                            className='w-full h-11 bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white font-bold text-sm rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer border-none'
                        >
                            Avançar para Entrega
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
