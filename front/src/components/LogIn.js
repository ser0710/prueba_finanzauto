import { useState } from "react"
import { useAuth } from "./ContextAuth"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

const LogIn = () => {
    const [userData, setUserData] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState("")

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        try{
            await login(userData);
            navigate('/')
        } catch(error){
            setErrors(error.message)
        }
    }

    const handleRegister = () => {
        navigate('/register')
    }

    const handleCancelLogin = () => {
        navigate('/')
    }

    return(
        <div className="container">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleLogIn}>
                <div className="card cardInit">
                    <div className="card-body bodyInit">
                            <input 
                                placeholder="Usuario"
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                            <input 
                                type="password" 
                                placeholder="Contraseña"
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                    
                            <button className="btn btn-primary" type="submit">Iniciar sesión</button>
                        {errors}
                    </div>    
                </div>
            </form>
            
            <div className="btn_register">
                <button className="btn btn-danger" onClick={handleCancelLogin}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleRegister}>Registrarse</button>
            </div>
            
        </div>
    )
}

export default LogIn