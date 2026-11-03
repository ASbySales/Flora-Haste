import { ShoppingBag } from 'lucide-react'

export default function BotaoCarrinho({ carr, totalItens = 0 }) {
    return (
        <button 
            type="button"
            onClick={carr} 
            className='fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#D14D7C] to-[#E58AA9] text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-white cursor-pointer group'
            aria-label="Abrir Sacola de Pedidos"
        >
            <ShoppingBag className='w-6 h-6' />
            {totalItens > 0 && (
                <span className='absolute -top-1.5 -right-1.5 bg-[#4E7A52] text-white text-[11px] font-bold h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm'>
                    {totalItens}
                </span>
            )}
        </button>
    )
}
