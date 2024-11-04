import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextAuth";
import { useEffect, useState } from "react";
import axios from "axios"

const Home = () => {
    const { user, idUser } = useAuth();

    const navigate = useNavigate();

    const [publications, setPublications] = useState([])
    const [all, setAll] = useState(true)

    const handleLogin = () => {
        navigate('/login');
    }

    const handleUserInfo = () => {
        navigate('/user_data')
    }

    const publicationsHandler = async () => {
        try{
            const response = all 
            ? await axios.get('http://localhost:8001/api/publications/') 
            : await axios.get(`http://localhost:8001/api/publication/${idUser}/`, {
                headers:{
                    Token: localStorage.getItem('token')
                }
            })
            setPublications(response.data)

        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        // const publi = async () => {
        //     try{
        //         const response = await axios.get('http://localhost:8001/api/publications/')
        //         setPublications(response.data)
        //     } catch(error){
        //         console.log(error)
        //     }
        // }
        // publi();
        // if (user){
            publicationsHandler()
        // }
    }, [all, user])

    return(
        <div>
            {user ? "hola desde home " + user :  "hola desde home" }
            {user ? (<button>Cerrar sesión</button>) : (<button onClick={handleLogin}>Iniciar sesión</button>)}
            {user ? (<button onClick={handleUserInfo}>Editar perfil</button>) : null}
            {
                user && (
                    <div>
                        <button onClick={() => setAll(true)}>Ver todas</button>
                        <button onClick={() => setAll(false)}>ver las mias</button>
                    </div>    
                )
            }
            <ul>
                {publications.map((pub, index) => (
                    <li key={index}><h2>{pub.title}</h2><h4>{pub.content}</h4></li>
                    
                ))}
            </ul>
            
        </div>
    )

}

export default Home