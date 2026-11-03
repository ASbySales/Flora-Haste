import catalogo from '../assets/catalogo.png'
import whatsapp from '../assets/whatsapp.png'
import logoFloraHaste from '../assets/logo-flora-haste.jpg'
import { WHATSAPP_NUMBER } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-start bg-white selection:bg-[#D9A09E] selection:text-white'>
            
            {/* Cabeçalho Curvo em Fluxo Natural (estilo JK) */}
            <header className='w-full relative bg-white flex flex-col items-center pb-4'>
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="minimal-01-mask" clipPathUnits="objectBoundingBox">
                            <path d="M 0,1 L 0,0 L 1,0 L 1,1 C .65 .8, .35 .8, 0 1 Z" />
                        </clipPath>
                    </defs>
                </svg>
                
                {/* Imagem de Capa com Gradiente Rose Gold chique idêntico ao JK */}
                <div 
                    className='h-[180px] w-full relative bg-gradient-to-tr from-[#E6C2C1]/70 via-[#D9A09E] to-[#E6C2C1]/90' 
                    style={{ clipPath: 'url(#minimal-01-mask)' }} 
                />
                
                {/* Foto do Perfil Circular Flutuante com borda inferior rose gold */}
                <div className='absolute top-[90px] left-1/2 -translate-x-1/2 w-[130px] h-[130px] rounded-full border-b-4 border-[#D9A09E] bg-white shadow-md overflow-hidden flex items-center justify-center'>
                    <img className='w-full h-full object-cover' src={logoFloraHaste} alt="Logo Flora Haste" />
                </div>
                
                {/* Título Oficial */}
                <div className='mt-[70px] text-center select-none tracking-wide p-2'>
                    <h1 className='text-3xl text-[#C08A89] font-cinzel font-semibold tracking-wide'>
                        FLORA HASTE
                    </h1>
                    <span className='text-sm block font-sans font-normal text-[#C08A89]/80 uppercase tracking-widest mt-0.5'>
                        Floricultura & Presentes Afetivos
                    </span>
                </div>
            </header>

            {/* Redes Sociais (Instagram) */}
            <section className='w-full max-w-[480px] flex justify-center items-center py-3 bg-white'>
                <a 
                    className='text-[#C08A89] hover:opacity-80 transition-opacity p-2' 
                    href='https://www.instagram.com/florahastecg' 
                    rel='noopener noreferrer' 
                    target='_blank'
                    aria-label="Instagram da Flora Haste"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.8503 0H7.14973C3.20735 0 0 3.20735 0 7.14973V16.8503C0 20.7926 3.20735 24 7.14973 24H16.8503C20.7926 24 24 20.7926 24 16.8503V7.14973C24 3.20735 20.7926 0 16.8503 0ZM21.5856 16.8503C21.5856 19.4655 19.4655 21.5856 16.8503 21.5856H7.14973C4.5345 21.5856 2.4144 19.4655 2.4144 16.8503V7.14973C2.4144 4.53446 4.5345 2.4144 7.14973 2.4144H16.8503C19.4655 2.4144 21.5856 4.53446 21.5856 7.14973V16.8503ZM12.0002 5.79297C8.57754 5.79297 5.79297 8.57754 5.79297 12.0002C5.79297 15.4228 8.57754 18.2074 12.0002 18.2074C15.4229 18.2074 18.2075 15.4229 18.2075 12.0002C18.2075 8.57749 15.4229 5.79297 12.0002 5.79297ZM12.0002 15.7931C9.90547 15.7931 8.20737 14.095 8.20737 12.0002C8.20737 9.90547 9.90551 8.20737 12.0002 8.20737C14.095 8.20737 15.7931 9.90547 15.7931 12.0002C15.7931 14.0949 14.0949 15.7931 12.0002 15.7931ZM19.7067 5.83895C19.7067 6.66041 19.0408 7.32633 18.2193 7.32633C17.3979 7.32633 16.7319 6.66041 16.7319 5.83895C16.7319 5.01749 17.3979 4.35156 18.2193 4.35156C19.0408 4.35156 19.7067 5.01749 19.7067 5.83895Z"/>
                    </svg>
                </a>
            </section>

            {/* Listagem de Links / Botões Minimalistas (Exato estilo JK) */}
            <section className='w-full max-w-[480px] flex flex-col pt-24 bg-white font-bold'>
                
                {/* BOTÃO 1: FAÇA SEU PEDIDO (WHATSAPP) */}
                <div className='w-full border-b border-[#C08A89]/20 hover:bg-black/[0.02] transition-colors duration-200'>
                    <a 
                        className='flex flex-row items-center justify-between px-6 py-4' 
                        target='_blank' 
                        rel='noopener noreferrer' 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido.`}
                    >
                        <img className='w-14 h-14 rounded-full object-cover' alt="Faça seu pedido" src={whatsapp} />
                        
                        <div className='flex-1 flex flex-row justify-between items-center ml-4'>
                            <span className='text-[#D9A09E] text-base font-semibold'>Faça seu pedido</span>
                            <svg className='w-5 h-5 text-[#D9A09E]' viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4419 5.44194C15.686 5.19786 15.686 4.80213 15.4419 4.55806L11.4645 0.580581C11.2204 0.336504 10.8247 0.336504 10.5806 0.580582C10.3365 0.824659 10.3365 1.22039 10.5806 1.46447L14.1161 5L10.5806 8.53553C10.3365 8.77961 10.3365 9.17534 10.5806 9.41942C10.8247 9.66349 11.2204 9.66349 11.4645 9.41942L15.4419 5.44194ZM4.82111e-08 5.625L15 5.625L15 4.375L-4.82111e-08 4.375L4.82111e-08 5.625Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </a>
                </div>
                
                {/* BOTÃO 2: NOSSO CATÁLOGO */}
                <div className='w-full border-b border-[#C08A89]/20 hover:bg-black/[0.02] transition-colors duration-200'>
                    <button 
                        className='w-full flex flex-row items-center justify-between px-6 py-4 cursor-pointer border-none bg-transparent' 
                        type='button' 
                        onClick={() => navigate('/Catalogo')} 
                    >
                        <img className='w-14 h-14 rounded-full opacity-60 object-cover' alt="Nosso catálogo" src={catalogo} />
 
                        <div className='flex-1 flex flex-row justify-between items-center ml-4'>
                            <span className='text-[#D9A09E] text-base font-semibold'>Nosso Catálogo</span>
                            <svg className='w-5 h-5 text-[#D9A09E]' viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.4419 5.44194C15.686 5.19786 15.686 4.80213 15.4419 4.55806L11.4645 0.580581C11.2204 0.336504 10.8247 0.336504 10.5806 0.580582C10.3365 0.824659 10.3365 1.22039 10.5806 1.46447L14.1161 5L10.5806 8.53553C10.3365 8.77961 10.3365 9.17534 10.5806 9.41942C10.8247 9.66349 11.2204 9.66349 11.4645 9.41942L15.4419 5.44194ZM4.82111e-08 5.625L15 5.625L15 4.375L-4.82111e-08 4.375L4.82111e-08 5.625Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </button>
                </div>
            </section>
 
            {/* Rodapé da Página */}
            <footer className='w-full max-w-[480px] py-8 flex flex-col items-center justify-end bg-white gap-2 mt-auto'>
                <hr className='w-16 border-t border-[#C08A89]/20'></hr>
                <div className='text-xs text-[#C08A89]/70 font-light font-cinzel'>
                    Flora Haste Floricultura & Presentes Afetivos
                </div>
                <div className='text-[10px] text-gray-400 font-sans'>
                    by <a className='hover:underline font-normal text-gray-500' target='_blank' rel='noopener noreferrer' href='https://asales.online/'> As </a>
                </div>
            </footer>
        </div>
    )
}
