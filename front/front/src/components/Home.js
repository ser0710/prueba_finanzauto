import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextAuth";

const Home = () => {
    const { user } = useAuth();

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return(
        <div>
            {user ? "hola desde home " + user :  "hola desde home" }
            {user ? (<button>Cerrar sesión</button>) : (<button onClick={handleLogin}>Iniciar sesión</button>)}
        </div>
    )

}

export default Home