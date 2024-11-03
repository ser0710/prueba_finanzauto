import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextAuth";

const Home = () => {
    const { user } = useAuth();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleUserInfo = () => {
        navigate('/user_data')
    }

    return(
        <div>
            {user ? "hola desde home " + user :  "hola desde home" }
            {user ? (<button>Cerrar sesión</button>) : (<button onClick={handleLogin}>Iniciar sesión</button>)}
            {user ? (<button onClick={handleUserInfo}>Editar perfil</button>) : null}
        </div>
    )

}

export default Home