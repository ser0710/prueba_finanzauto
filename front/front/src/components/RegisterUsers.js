import { useState } from "react"
import { useAuth } from "./ContextAuth"
import { useNavigate } from "react-router-dom";
import '../styles/RegisterUsers.css'

const RegisterUsers = () => {

    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = { username, first_name: firstName, last_name: lastName, email, password }
    
        try {
            await register(credentials)
            navigate('/')
        } catch (error) {
            let msg = error.message.replace(/,/g, '')
            setErrors(msg.split("."))
        }
    }

    const handleCancelRegister = () => {
        navigate('/')
    }
 
    return(
        <div className="container">
            <h1>
                Registro
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="card cardRegis">
                    <div className="card-body bodyRegis">
                        <input placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        <input placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                        <input placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button class="btn btn-primary" type="submit">Registrarse</button>
                        <button class="btn btn-danger" onClick={handleCancelRegister}>Cancelar</button>
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((error, index) => (
                                    error.trim() && <li key={index}>{error.trim()}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterUsers