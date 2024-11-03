import { useState } from "react"
import { useAuth } from "./ContextAuth"
import { useNavigate } from "react-router-dom"


const LogIn = () => {
    const [userData, setUserData] = useState({ username: '', password: '' })

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        await login(userData);
        navigate('/')
    }

    return(
        <div>
            <form onSubmit={handleLogIn}>
                <input 
                placeholder="Usuario"
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
                <input 
                type="password" 
                placeholder="Contraseña"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}

export default LogIn