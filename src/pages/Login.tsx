import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

/*ToDo:
    Adicionar feedback no login (casos de erro, uma indicação que o submit foi chamado, etc)
        Ideias: 
        Usar toastify para um feedback simples e bonito
        Criar um componente customizado para isso 
    Integrar com o backend de fato
*/

//Página de login que é passada como uma função para o app.tsx
const Login = () => {
    //States que controlam os inputs sendo passados pelo usuário 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //State que controla o redirecionamento para a home depois do login
    const [redirect, setRedirect] = useState(false);
    
    //Função que dá submit no formulário para a API
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault(); // <-- Não recarregar a página 
        const apiURL = process.env.REACT_APP_API_URL || 'https://6618455d9a41b1b3dfbcac11.mockapi.io'; // Fallback para localhost se a variável de ambiente não estiver definida
        //As variáveis de ambiente ainda tem que ser criadas, ou podemos usar a url hardcoded mesmo

        try {
            // Mandar os dados para a API
            const response = await axios.post(`${apiURL}/todoapi/login`, {
              email, // Simplificação, já que o nome da propriedade e da variável são os mesmos
              password,
            });
    
            // Verificação da resposta (Código 200 é bem sucedido)
            if (response.status === 200) {
              setRedirect(true);
            } else {
              // Tratar de outros códigos aqui
              console.error("Login falhou com status:", response.status);
              // Idealmente, definiria um estado de erro aqui para informar ao usuário que o login falhou
            }
          } catch (error) {
          console.error("Erro ao fazer login:", error);
          // Aqui, você também poderia definir um estado de erro para informar ao usuário sobre o problema
        }
    };

    //Redirecionar
    if(redirect){
        return <Navigate to="/"/>;
    }
    return (
        <form className='form-floating' onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Faça o log in</h1>
        {/* O uso de placeholders aqui pode ser um problema de acessibilidade */}
        <div className="form-signin">
            <input type="email" className="form-control" placeholder="nome@exemplo.com" required 
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-signin">
            <input type="password" className="form-control" placeholder="Senha" required 
            onChange={e => setPassword(e.target.value)}
            />
        </div>
        <button className="form-signin btn btn-primary w-100 py-2" type="submit">Entrar</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
    );
}
export default Login;