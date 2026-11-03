import logoFloraHaste from '../assets/logo-flora-haste.jpg'

export default function Card({ produto, open }) {
    if (!produto) return null

    return (
        <article 
            onClick={() => open(produto)} 
            className='w-32 sm:w-36 flex flex-col items-center bg-white rounded-2xl p-2 ring-1 ring-[#D14D7C]/30 border border-[#F9E6EE] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 text-center group'
        >
            {/* Imagem do Produto 1:1 */}
            <div className='w-full aspect-square rounded-xl overflow-hidden border border-[#F9E6EE] bg-[#FFF8FA] flex items-center justify-center relative'>
                <img 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    src={produto.img || logoFloraHaste} 
                    alt={produto.nome} 
                    loading="lazy"
                />
            </div>

            {/* Informações do Produto */}
            <div className='w-full mt-2 px-0.5 text-left flex flex-col justify-between'>
                <h3 className='font-semibold text-xs text-gray-800 line-clamp-1 leading-tight'>
                    {produto.nome}
                </h3>
                {produto.descricao && (
                    <p className='text-[10px] text-gray-400 line-clamp-1 leading-snug mt-0.5'>
                        {produto.descricao}
                    </p>
                )}
                <span className='font-bold text-xs sm:text-sm text-[#D14D7C] mt-1'>
                    R$ {produto.valor}
                </span>
            </div>
        </article>
    )
}
