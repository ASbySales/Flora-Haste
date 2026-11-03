import AdminCatalogo from '../componentes/AdminCatalogo'

export default function Admin() {
    return(
        <>
        <article>
            <form>
                <label htmlFor='item-name'>Nome do modelo</label>
                <input id='item-name' type='text' />
                
                <label htmlFor='item-desc'>Descrição</label>
                <input id='item-desc' type='text' />
                
                <label htmlFor='item-value'>Valor (ex.: 13,00)</label>
                <input id='item-value' type='number' step='0.01' />
                
                <button type='submit'>Cadastrar Modelo</button>
            </form>
        </article>  
        <article>
            <AdminCatalogo/>    
        </article>
        </>

    )
}