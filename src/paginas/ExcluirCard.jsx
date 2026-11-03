import Card from '../componentes/Card'
import { useParams, useNavigate } from 'react-router-dom'

import hero from '../assets/hero.png'

const produtosFicticios = [
    {id: 1, nome: 'Flor de React', descricao: 'A flor dos programadores', valor: '8,00', img: hero},
    {id: 2, nome: 'Flor de Tailwind', descricao: 'Estilizada e cheirosa', valor: '10,00', img: hero},
    {id: 3, nome: 'Flor de Js', descricao: 'Sua beleza é a lógica', valor: '7,00', img: hero}
]

export default function ExcluirCard({item}) {
    const {id} = useParams()
    const produto = produtosFicticios.find((p) => p.id === Number(id))
    const navigate = useNavigate()

    if (!produto) {
        return (
            <article>
                <p>Produto não encontrado.</p>
                <button type='button' onClick={() => navigate(-1)}>Voltar</button>
            </article>
        )
    }

    return(
        <article>
            <div key={produto.id}>
                <Card
                    key={produto.id}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    valor={produto.valor}
                    img={produto.img}
                />
            </div>
            <a>Tem certeza que deseja excluir?</a>
            <button type='button' onClick={()=>{item.id.exclusão.bancodedadosetc}}>Sim</button>
            <button type='button'onClick={()=>navigate(-1)}>Não</button>
        </article>
    )
}