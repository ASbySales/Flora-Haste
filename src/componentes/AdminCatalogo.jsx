import ListaCards from './ListaCards'
import hero from '../assets/hero.png'

export default function AdminCatalogo() {
const produtosFicticios = [
    {id: 1, nome: 'Flor de React', descricao: 'A flor dos programadores', valor: '8,00', img: hero},
    {id: 2, nome: 'Flor de Tailwind', descricao: 'Estilizada e cheirosa', valor: '10,00', img: hero}
]
    return(
        <article>
            <div>
                <ListaCards produtos={produtosFicticios} comAcoes={true}/>
            </div>
        </article>
    )
}