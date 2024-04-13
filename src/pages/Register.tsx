import {useState, SyntheticEvent} from 'react';
import axios from 'axios';

/*ToDo:
    Feedback para o registro
    Tratar de casos de erro no post
*/ 

//Página de registro que é passada como uma função para o app.tsx
const Register = () => {
    //Dados a serem passados para o registro
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //Função que trata do submit do formulário
    const submit = async (e: SyntheticEvent) => {
        if(password != confirmPassword){
            window.alert("As senhas são diferentes!")
            return;
        } 
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/register',{
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            confirm_password: confirmPassword,
        });
        console.log(response);
    }
    return (
        <form className='form-floating' onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Registrar-se</h1>
            <div className="form-signin">
                <input className="form-control" placeholder="Primeiro nome" required 
                onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-signin">
                <input className="form-control" placeholder="Sobrenome" required 
                onChange={e => setLastName(e.target.value)}
                />
            </div>
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
            <div className="form-signin">
                <input type="password" className="form-control" placeholder="Confirme sua senha" required 
                onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className="form-signin btn btn-primary w-100 py-2" type="submit">Registrar</button>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
    );
}

export default Register;