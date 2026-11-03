import { useRef } from 'react'
import Card from './Card'

export default function ListaCards({ produtos, opened }) {    
    const scrollContainerRef = useRef(null)

    const scroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className='w-full relative py-1.5 group'>
            {/* Seta para a Esquerda (Desktop) */}
            <button
                type="button"
                onClick={() => scroll(-220)}
                className='absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#D14D7C] border border-[#F9E6EE] shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer text-xs'
                aria-label="Rolar para esquerda"
            >
                ❮
            </button>

            {/* O Trilho rolável */}
            <div 
                ref={scrollContainerRef}
                className='flex flex-row gap-2.5 transition-transform duration-300 ease-out w-full overflow-x-auto no-scrollbar px-2 py-1'
            > 
                {produtos.map((produto) => (
                    <div key={produto.id} className='shrink-0'>
                        <Card 
                            produto={produto}
                            open={opened}
                        />
                    </div>
                ))}
            </div>

            {/* Seta para a Direita (Desktop) */}
            <button
                type="button"
                onClick={() => scroll(220)}
                className='absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#D14D7C] border border-[#F9E6EE] shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer text-xs'
                aria-label="Rolar para direita"
            >
                ❯
            </button>
        </div>
    )
}
