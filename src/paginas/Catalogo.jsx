import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, TENANT_ID } from '../lib/supabase'
import logoFloraHaste from '../assets/logo-flora-haste.jpg'
import ListaCards from '../componentes/ListaCards'
import ModalServico from '../componentes/ModalServico'
import BotaoCarrinho from './botaoCarrinho'
import Carrinho from './Carrinho'

export default function Catalogo() {
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeProduct, setActiveProduct] = useState(null)
    const [carrinho, setCarrinho] = useState(false)
    const [itensCarrinho, setItensCarrinho] = useState(() => {
        try {
            const salvo = localStorage.getItem('flora_carrinho_itens')
            return salvo ? JSON.parse(salvo) : []
        } catch {
            return []
        }
    })

    // Sincroniza o carrinho no localStorage
    useEffect(() => {
        try {
            localStorage.setItem('flora_carrinho_itens', JSON.stringify(itensCarrinho))
        } catch (e) {
            console.error('Erro ao sincronizar carrinho:', e)
        }
    }, [itensCarrinho])

    // Busca dados do Supabase da AS Gestão filtrando pelo tenant da Flora Haste
    useEffect(() => {
        async function carregarCatalogo() {
            try {
                setLoading(true)

                // 1. Busca categorias do tenant
                const { data: catData, error: errCat } = await supabase
                    .from('categorias')
                    .select('*')
                    .eq('tenant_id', TENANT_ID)
                    .eq('arquivado', false)
                    .order('ordem', { ascending: true })
                    .order('id', { ascending: true })

                if (errCat) throw errCat

                // 2. Busca serviços/produtos do tenant
                const { data: servData, error: errServ } = await supabase
                    .from('servicos')
                    .select('*')
                    .eq('tenant_id', TENANT_ID)
                    .eq('arquivado', false)
                    .order('ordem', { ascending: true })
                    .order('id', { ascending: true })

                if (errServ) throw errServ

                // 3. Agrupa os serviços dentro das categorias
                const formatadas = (catData || []).map(cat => ({
                    ...cat,
                    servicos: (servData || [])
                        .filter(s => s.categoria_id === cat.id)
                        .map(s => ({
                            ...s,
                            valor: parseFloat(s.valor || 0).toFixed(2).replace('.', ',')
                        }))
                }))

                setCategorias(formatadas)
            } catch (error) {
                console.error('Erro ao carregar catálogo da Flora Haste:', error)
            } finally {
                setLoading(false)
            }
        }
        carregarCatalogo()
    }, [])

    const adicionarAoCarrinho = ({ quantidadePrincipal = 1, opcionais = {} }) => {
        if (!activeProduct) return
        const novoItem = {
            idEscolha: Date.now() + Math.random(),
            produto: activeProduct,
            quantidade: quantidadePrincipal,
            opcionais: opcionais
        }
        setItensCarrinho(prev => [...prev, novoItem])
    }

    // Congela a tela de fundo ao abrir modais para experiência nativa em celular
    useEffect(() => {
        const modalAberto = Boolean(activeProduct || carrinho)
        if (modalAberto) {
            const scrollY = window.scrollY || window.pageYOffset || 0
            document.body.dataset.scrollY = String(scrollY)
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.left = '0'
            document.body.style.right = '0'
            document.body.style.width = '100%'
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            const scrollY = document.body.dataset.scrollY
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.width = ''
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
            if (scrollY !== undefined && scrollY !== '') {
                window.scrollTo(0, parseInt(scrollY, 10))
                delete document.body.dataset.scrollY
            }
        }
        return () => {
            document.body.style.position = ''
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [activeProduct, carrinho])

    const totalQtdCarrinho = itensCarrinho.reduce((acc, it) => acc + (it.quantidade || 1), 0)

    // Opcionais/Mimos avulsos (categorias com escolha = false)
    const opcionaisDisponiveis = categorias
        .filter(cat => cat.escolha === false)
        .flatMap(cat => cat.servicos || [])

    if (loading) {
        return (
            <div className='w-full min-h-screen flex flex-col items-center justify-center bg-[#FFF8FA] gap-3'>
                <div className='w-14 h-14 rounded-full border-4 border-[#D14D7C] border-t-transparent animate-spin' />
                <p className='text-xs font-semibold text-gray-500 font-cinzel tracking-wider'>Carregando arranjos florais...</p>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-start bg-[#FFF8FA] relative selection:bg-[#D14D7C] selection:text-white'>
            
            {/* Header da Floricultura */}
            <header className='w-full relative bg-white flex flex-col items-center pb-2 shadow-xs border-b border-[#F9E6EE]'>
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="flora-mask" clipPathUnits="objectBoundingBox">
                            <path d="M 0,1 L 0,0 L 1,0 L 1,1 C .65 .8, .35 .8, 0 1 Z" />
                        </clipPath>
                    </defs>
                </svg>
                
                {/* Capa com Gradiente Blush Floral */}
                <div 
                    className='h-[130px] w-full relative bg-gradient-to-r from-[#F9D6DE] via-[#F4B2C3] to-[#F9D6DE]' 
                    style={{ clipPath: 'url(#flora-mask)' }} 
                />
                
                {/* Botão Voltar */}
                <button 
                    onClick={() => navigate('/')} 
                    className='fixed top-4 left-4 z-20 bg-white/90 backdrop-blur-xs hover:bg-white text-[#D14D7C] border border-[#F9E6EE] rounded-full px-3.5 py-1.5 shadow-sm text-xs font-semibold font-cinzel transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1'
                >
                    ❮ Início
                </button>

                {/* Logo Floral Flutuante */}
                <div className='absolute top-12 left-1/2 -translate-x-1/2 w-[116px] h-[116px] rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center ring-2 ring-[#D14D7C]/20'>
                    <img className='w-full h-full object-cover' src={logoFloraHaste} alt="Logo Flora Haste" />
                </div>
                
                {/* Título Oficial */}
                <div className='mt-[66px] flex flex-col items-center text-center px-4'>
                    <h1 className='text-2xl text-gray-800 font-cinzel font-bold tracking-wider'>
                        FLORA HASTE
                    </h1>
                    <span className='text-xs font-sans text-[#D14D7C] font-semibold tracking-widest uppercase mt-0.5'>
                        Floricultura & Presentes
                    </span>
                </div>
            </header>

            {/* Vitrine: Lista de Categorias e Seus Carrosséis */}
            <main className='w-full max-w-[480px] flex flex-col items-center px-3 gap-3.5 py-4 pb-24'>
                {categorias.filter(cat => cat.escolha !== false && cat.servicos?.length > 0).map((cat) => (
                    <div key={cat.id} className='w-full flex flex-col bg-white ring-1 ring-[#F9E6EE] rounded-2xl overflow-hidden shadow-xs'>
                        {/* Faixa da Categoria */}
                        <div className='bg-gradient-to-r from-[#D14D7C] via-[#E58AA9] to-[#D14D7C] py-2 px-3 border-b border-[#F9E6EE] flex items-center justify-center'>
                            <h2 className='text-xs sm:text-sm text-white font-cinzel font-bold text-center tracking-wider uppercase drop-shadow-xs'>
                                {cat.nome}
                            </h2>
                        </div>
                        {/* Carrossel de Cards */}
                        <ListaCards 
                            produtos={cat.servicos} 
                            opened={(prod) => setActiveProduct(prod)} 
                        />
                    </div>
                ))}
            </main>
            
            {/* Modal de Detalhes e Personalização do Produto */}
            {activeProduct && (
                <ModalServico 
                    produto={activeProduct}
                    opcionais={opcionaisDisponiveis}
                    onClose={() => setActiveProduct(null)}
                    onConfirm={adicionarAoCarrinho}
                />
            )}

            {/* Botão Flutuante da Sacola de Pedidos */}
            <BotaoCarrinho carr={() => setCarrinho(true)} totalItens={totalQtdCarrinho} />

            {/* Gaveta / Modal do Carrinho */}
            {carrinho && (
                <Carrinho 
                    carr={() => setCarrinho(false)} 
                    itens={itensCarrinho} 
                    setItens={setItensCarrinho}
                    opcionaisData={opcionaisDisponiveis}
                />
            )}

            {/* Rodapé Elegante */}
            <footer className='w-full max-w-[480px] py-6 flex flex-col items-center justify-end gap-1.5 text-center mt-auto'>
                <div className='text-[11px] text-[#D14D7C]/80 font-light'>
                    Flora Haste Floricultura & Presentes · Feito com carinho
                </div>
                <div className='text-[10px] text-gray-400'>
                    by <a className='hover:underline font-semibold text-gray-600' target='_blank' rel='noopener noreferrer' href='https://asnamanga.vercel.app/'>ASbySales</a>
                </div>
            </footer>
        </div>
    )
}
