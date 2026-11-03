export default function Login() {
    return (
        <article> 
            <form>
                <label htmlFor='user-email'>Digite seu e-mail</label>
                <input id='user-email' type='email'/>
                <label htmlFor='user-password'>Digite sua senha</label>
                <input id='user-password' type='password'/>
                <button type='submit'>Entrar</button>
            </form>
        </article>
)}