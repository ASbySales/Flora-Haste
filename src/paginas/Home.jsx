import { useNavigate } from 'react-router-dom'
import logoFloraHaste from '../assets/logo-flora-haste.jpg'
import { WHATSAPP_NUMBER } from '../lib/supabase'
import { Flower2, MessageCircle, MapPin } from 'lucide-react'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-start bg-[#FFF8FA] text-gray-800'>
            
            {/* Cabeçalho Visual Link na Bio */}
            <header className='w-full relative bg-white flex flex-col items-center pb-4 border-b border-[#F9E6EE] shadow-xs'>
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="home-mask" clipPathUnits="objectBoundingBox">
                            <path d="M 0,1 L 0,0 L 1,0 L 1,1 C .65 .8, .35 .8, 0 1 Z" />
                        </clipPath>
                    </defs>
                </svg>
                
                {/* Imagem de Capa Floral com Recorte Curvo */}
                <div 
                    className='h-[170px] w-full relative bg-gradient-to-r from-[#F9D6DE] via-[#F4B2C3] to-[#F9D6DE]' 
                    style={{ clipPath: 'url(#home-mask)' }} 
                />
                
                {/* Foto do Perfil (Logo Flora Haste Oficial com Lírio) */}
                <div className='absolute top-[85px] left-1/2 -translate-x-1/2 w-[128px] h-[128px] rounded-full border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center ring-2 ring-[#D14D7C]/25'>
                    <img className='w-full h-full object-cover' src={logoFloraHaste} alt="Logo Flora Haste Floricultura" />
                </div>
                
                {/* Título Oficial */}
                <div className='mt-[60px] text-center px-4 flex flex-col items-center'>
                    <h1 className='text-3xl text-gray-900 font-cinzel font-bold tracking-wider'>
                        FLORA HASTE
                    </h1>
                    <span className='text-xs font-sans text-[#D14D7C] font-semibold tracking-widest uppercase mt-1'>
                        Floricultura & Presentes Afetivos
                    </span>
                    <p className='text-xs text-gray-500 max-w-[290px] mt-2 italic font-playfair'>
                        "Cultivando momentos inesquecíveis através da beleza natural das flores e presentes."
                    </p>
                </div>

                {/* Ícone Redes Sociais */}
                <div className='flex justify-center items-center gap-3 mt-3'>
                    <a 
                        className='h-9 w-9 rounded-full bg-[#FFF8FA] border border-[#F9E6EE] flex items-center justify-center text-[#D14D7C] hover:scale-110 active:scale-95 transition-all shadow-xs' 
                        href='https://www.instagram.com/' 
                        rel='noopener noreferrer' 
                        target='_blank'
                        aria-label="Instagram da Flora Haste"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.8503 0H7.14973C3.20735 0 0 3.20735 0 7.14973V16.8503C0 20.7926 3.20735 24 7.14973 24H16.8503C20.7926 24 24 20.7926 24 16.8503V7.14973C24 3.20735 20.7926 0 16.8503 0ZM21.5856 16.8503C21.5856 19.4655 19.4655 21.5856 16.8503 21.5856H7.14973C4.5345 21.5856 2.4144 19.4655 2.4144 16.8503V7.14973C2.4144 4.53446 4.5345 2.4144 7.14973 2.4144H16.8503C19.4655 2.4144 21.5856 4.53446 21.5856 7.14973V16.8503ZM12.0002 5.79297C8.57754 5.79297 5.79297 8.57754 5.79297 12.0002C5.79297 15.4228 8.57754 18.2074 12.0002 18.2074C15.4229 18.2074 18.2075 15.4229 18.2075 12.0002C18.2075 8.57749 15.4229 5.79297 12.0002 5.79297ZM12.0002 15.7931C9.90547 15.7931 8.20737 14.095 8.20737 12.0002C8.20737 9.90547 9.90551 8.20737 12.0002 8.20737C14.095 8.20737 15.7931 9.90547 15.7931 12.0002C15.7931 14.0949 14.0949 15.7931 12.0002 15.7931ZM19.7067 5.83895C19.7067 6.66041 19.0408 7.32633 18.2193 7.32633C17.3979 7.32633 16.7319 6.66041 16.7319 5.83895C16.7319 5.01749 17.3979 4.35156 18.2193 4.35156C19.0408 4.35156 19.7067 5.01749 19.7067 5.83895Z"/>
                        </svg>
                    </a>
                    <a 
                        className='h-9 w-9 rounded-full bg-[#FFF8FA] border border-[#F9E6EE] flex items-center justify-center text-[#4E7A52] hover:scale-110 active:scale-95 transition-all shadow-xs' 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20flores%20e%20presentes.`} 
                        rel='noopener noreferrer' 
                        target='_blank'
                        aria-label="WhatsApp da Flora Haste"
                    >
                        <MessageCircle className='w-4.5 h-4.5' />
                    </a>
                </div>
            </header>

            {/* Lista de Ações / Links da Bio */}
            <main className='w-full max-w-[420px] flex flex-col gap-3 px-4 py-6'>
                
                {/* BOTÃO 1: VER CATÁLOGO FLORAL (Destaque Principal) */}
                <button 
                    type="button"
                    onClick={() => navigate('/Catalogo')}
                    className='w-full bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white rounded-2xl p-4 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer flex items-center justify-between border border-white/20'
                >
                    <div className='flex items-center gap-3'>
                        <div className='h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center text-white'>
                            <Flower2 className='w-6 h-6' />
                        </div>
                        <div className='text-left'>
                            <h2 className='font-bold text-sm sm:text-base leading-tight font-cinzel'>
                                Catálogo Floral & Cestas
                            </h2>
                            <p className='text-xs text-white/90 font-light mt-0.5'>
                                Escolha buquês, arranjos e monte seu presente
                            </p>
                        </div>
                    </div>
                    <span className='text-lg font-bold'>❯</span>
                </button>

                {/* BOTÃO 2: WHATSAPP DE ATENDIMENTO */}
                <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Vim%20pelo%20Link%20da%20Bio%20e%20gostaria%20de%20falar%20com%20uma%20atendente.`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full bg-white text-gray-800 rounded-2xl p-4 shadow-xs border border-[#F9E6EE] hover:border-[#D14D7C]/40 hover:scale-[1.01] active:scale-98 transition-all duration-200 flex items-center justify-between'
                >
                    <div className='flex items-center gap-3'>
                        <div className='h-11 w-11 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center'>
                            <MessageCircle className='w-6 h-6' />
                        </div>
                        <div className='text-left'>
                            <h2 className='font-bold text-sm text-gray-800 leading-tight font-cinzel'>
                                Pedidos sob Medida no WhatsApp
                            </h2>
                            <p className='text-xs text-gray-400 font-light mt-0.5'>
                                Fale com nossa florista para arranjos exclusivos
                            </p>
                        </div>
                    </div>
                    <span className='text-sm text-gray-400'>❯</span>
                </a>

                {/* BOTÃO 3: HORÁRIOS & ENTREGAS */}
                <div className='w-full bg-white rounded-2xl p-3.5 border border-[#F9E6EE] shadow-3xs flex items-center gap-3 text-left'>
                    <div className='h-10 w-10 rounded-xl bg-[#FFF8FA] text-[#D14D7C] flex items-center justify-center shrink-0'>
                        <MapPin className='w-5 h-5' />
                    </div>
                    <div>
                        <h3 className='font-bold text-xs text-gray-800 font-cinzel'>Entregas em toda a região</h3>
                        <p className='text-[11px] text-gray-400 mt-0.5'>Flores frescas e embalagens de presente preparadas no dia.</p>
                    </div>
                </div>
            </main>

            {/* Rodapé */}
            <footer className='w-full max-w-[420px] py-6 flex flex-col items-center justify-end gap-1 text-center mt-auto'>
                <hr className='w-14 border-t border-[#D14D7C]/20 mb-2' />
                <div className='text-xs text-[#D14D7C]/80 font-light font-cinzel'>
                    Flora Haste Floricultura & Presentes
                </div>
                <div className='text-[10px] text-gray-400'>
                    by <a className='hover:underline font-semibold text-gray-500' target='_blank' rel='noopener noreferrer' href='https://asnamanga.vercel.app/'>ASbySales</a>
                </div>
            </footer>
        </div>
    )
}
