import { useState } from 'react'
import logoFloraHaste from '../assets/logo-flora-haste.jpg'

// --- SUB-COMPONENTE 1: DETALHES DO PRODUTO ---
function DetalhesProduto({ produto, irPara, opcionais, onClose, onConfirm }) {
    const isUnitario = produto.tipo === 'extra' || produto.tipo === 'substitutivo'
    const [quantidade, setQuantidade] = useState(1)
    const temAdicionais = produto.aceita_adicionais !== false && opcionais && opcionais.length > 0

    return (
        <div className="flex flex-col">
            <div className='h-11 w-full flex justify-start items-end px-3 text-xl font-bold'>
                <button 
                    type="button"
                    onClick={onClose} 
                    className='h-8 w-8 hover:scale-110 active:scale-95 flex justify-center items-center rounded-full bg-[#F9E6EE] text-[#D14D7C] cursor-pointer border-none font-bold'
                >
                    ✕
                </button>
            </div>
            
            <div className='h-52 w-full flex justify-center mt-2 px-4'>
                <div className='w-52 h-52 aspect-square bg-[#FFF8FA] rounded-3xl shadow-md flex items-center justify-center overflow-hidden ring-2 ring-[#D14D7C]/20 border border-[#F9E6EE]'>
                    <img 
                        src={produto.img || logoFloraHaste} 
                        alt={produto.nome} 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-center py-3 px-4'>
                <div className='w-full max-w-[280px] flex flex-col gap-1 text-left'>
                    <p className='text-gray-900 font-bold text-lg leading-tight font-cinzel'>{produto.nome}</p>
                    {produto.descricao && (
                        <div className='text-xs text-gray-500 line-clamp-4 mt-0.5 leading-relaxed'>
                            {produto.descricao}
                        </div>
                    )}
                    <p className='text-xl text-[#D14D7C] font-bold mt-1'>
                        R$ {produto.valor}
                        {isUnitario && <span className='text-xs text-gray-400 font-normal ml-1'>/ un</span>}
                    </p>
                </div>

                {/* Seletor de Quantidade para itens unitários */}
                {isUnitario && (
                    <div className='w-full max-w-[280px] flex items-center justify-between px-3.5 py-2 bg-[#FFF8FA] rounded-2xl border border-[#F9E6EE] mt-3 shadow-xs'>
                        <span className='text-xs font-bold text-gray-700'>Quantidade:</span>
                        <div className='flex items-center gap-3'>
                            <button 
                                type="button"
                                onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                                className='h-7 w-7 bg-white border border-gray-200 rounded-full flex justify-center items-center font-bold text-base cursor-pointer hover:bg-gray-100 active:scale-90 transition-all'
                            >
                                -
                            </button>
                            <span className='font-bold text-sm text-gray-800 w-4 text-center'>{quantidade}</span>
                            <button 
                                type="button"
                                onClick={() => setQuantidade(prev => prev + 1)}
                                className='h-7 w-7 bg-white border border-gray-200 rounded-full flex justify-center items-center font-bold text-base cursor-pointer hover:bg-gray-100 active:scale-90 transition-all'
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className='h-16 w-full flex justify-center items-center gap-2 px-4 pb-2'>
                {temAdicionais && (
                    <button 
                        type="button"
                        onClick={() => irPara(() => OpcionaisProduto)}
                        className='h-11 px-4 font-semibold text-xs sm:text-sm bg-white border border-[#D14D7C] text-[#D14D7C] rounded-xl shadow-xs hover:bg-[#FFF8FA] active:scale-95 transition-all cursor-pointer'
                    >
                        + Mimos & Adicionais
                    </button>
                )}

                <button 
                    type="button"
                    onClick={() => {
                        onConfirm({ quantidadePrincipal: quantidade, opcionais: {} })
                        onClose()
                    }}
                    className='h-11 flex-1 max-w-[220px] font-bold text-sm bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-none'
                >
                    Adicionar ao Pedido
                </button>
            </div>
        </div>
    )
}

// --- SUB-COMPONENTE 2: ADICIONAIS & MIMOS ---
function OpcionaisProduto({ produto, opcionais, irPara, onClose, onConfirm }) {
    const [quant, setQuant] = useState({})

    const finalizarComOpcionais = () => {
        onConfirm({
            quantidadePrincipal: 1,
            opcionais: quant
        })
        onClose()
    }

    return (
        <div className="flex flex-col">
            <div className='h-11 w-full flex justify-between items-center px-4 font-bold border-b border-gray-100 pb-1'>
                <button 
                    type="button"
                    onClick={() => irPara(() => DetalhesProduto)} 
                    className='h-8 w-8 flex justify-center items-center bg-[#F9E6EE] text-[#D14D7C] rounded-full cursor-pointer border-none text-xs'
                >
                    ❮
                </button>
                <p className='font-bold text-gray-800 text-sm font-cinzel'>
                    Personalizar Presente
                </p>
                <div className='w-8' />
            </div>
            
            <div className='flex flex-col max-h-80 overflow-y-auto overscroll-contain no-scrollbar my-2 px-3'>
                <p className='text-[11px] text-gray-500 text-center mb-2'>
                    Adicione bombons, balões ou cartões especiais ao seu presente:
                </p>
                <div className='flex flex-col gap-2'>
                    {opcionais.map((item) => (
                        <div key={item.id} className='bg-[#FFF8FA] border border-[#F9E6EE] rounded-2xl p-2.5 flex flex-row justify-between items-center shadow-3xs'>
                            <div className='flex flex-row items-center gap-2.5 min-w-0 pr-2'>
                                <img 
                                    src={item.img || logoFloraHaste} 
                                    className='w-11 h-11 bg-white rounded-xl border border-[#F9E6EE] object-cover shrink-0' 
                                    alt={item.nome}
                                />
                                <div className='flex flex-col text-left truncate'>
                                    <span className='text-xs text-gray-800 font-bold truncate'>{item.nome}</span>
                                    <span className='text-[11px] font-semibold text-[#D14D7C]'>
                                        + R$ {item.valor}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 shrink-0'>
                                <button 
                                    type="button"
                                    onClick={() => setQuant(prev => ({ ...prev, [item.id]: Math.max(0, (prev[item.id] || 0) - 1) }))}
                                    className='h-6 w-6 bg-white border border-gray-200 rounded-full flex justify-center items-center font-bold text-sm cursor-pointer hover:bg-gray-100 active:scale-90 transition-all'
                                >
                                    -
                                </button>
                                <span className='font-bold text-xs text-gray-800 w-4 text-center'>{quant[item.id] || 0}</span>
                                <button 
                                    type="button"
                                    onClick={() => setQuant(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))}
                                    className='h-6 w-6 bg-white border border-gray-200 rounded-full flex justify-center items-center font-bold text-sm cursor-pointer hover:bg-gray-100 active:scale-90 transition-all'
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='h-14 w-full flex justify-center items-center px-4 pt-1'>
                <button 
                    type="button"
                    onClick={finalizarComOpcionais}
                    className='w-full h-11 font-bold text-sm bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer border-none'
                >
                    Confirmar e Adicionar
                </button>
            </div>
        </div>
    )
}

// --- COMPONENTE PRINCIPAL DO MODAL ---
export default function ModalServico({ produto, opcionais, onClose, onConfirm }) {
    const [subComponente, setSubComponente] = useState(() => DetalhesProduto)
    const CurrentSubComponent = subComponente

    return (
        <div 
            onClick={onClose}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn'
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className='w-full max-w-[340px] bg-white rounded-3xl p-3 shadow-2xl overflow-hidden border border-[#F9E6EE] animate-scaleUp'
            >
                <CurrentSubComponent 
                    produto={produto}
                    irPara={setSubComponente}
                    opcionais={opcionais}
                    onClose={onClose}
                    onConfirm={onConfirm}
                />
            </div>
        </div>
    )
}
