import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextAuth";
import { useEffect, useState } from "react";
import axios from "axios"

const Home = () => {
    const { user, idUser } = useAuth();

    const navigate = useNavigate();

    const [publications, setPublications] = useState([])
    const [all, setAll] = useState(true)
    const [addPub, setAddPub] = useState(false)
    const [newPub, setNewPub] = useState({
        title: '',
        content: ''
    })
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)
    const [current, setCurrent] = useState('http://localhost:8001/api/publications/')
 
    const handleLogin = () => {
        navigate('/login');
    }

    const handleUserInfo = () => {
        navigate('/user_data')
    }

    const publicationsHandler = async () => {
        try{

            // const url = all 
            // ? current
            // : `http://localhost:8001/api/publication/${idUser}/`
            const response = await axios.get(current, {
                headers:{
                    Token: sessionStorage.getItem('token'),
                    params: { page: current }
                }
            })
            setPublications(response.data.results)
            setNextPage(response.data.next)
            setPrevPage(response.data.previous)

        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
            publicationsHandler()
    }, [all, user, current])

    const handleCreatePub = (e) => {
        setNewPub({...newPub, [e.target.name]: e.target.value})
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8001/api/publicate/', newPub, {
                headers:{
                    Token: sessionStorage.getItem('token')
                }
            })
            const newPublication = {
                id: response.data.id,
                title: newPub.title,
                content: newPub.content
            }
            setPublications((prev) => [...prev, newPublication])
            setNewPub({ title: '', content: '' });
            setAddPub(false)
        } catch(error){
            console.log(error)
        }
        
    }

    const handleCancel =  () => {
        setNewPub({ title: '', content: '' });
        setAddPub(false)
    }

    const handleDelete = async (index) => {
        try {
            const response = await axios.delete(`http://localhost:8001/api/publication/${index}/`, {
                headers:{
                    Token: sessionStorage.getItem('token')
                }
            })
            setPublications((prev) => prev.filter(pub => pub.id !== index));
        } catch(error){
            console.log(error)
        }
    }

    const handleNextPage = () => {
        if (nextPage){
            setCurrent(nextPage)
        } 
    }

    const handlePrevPage = () => {
        if (prevPage) {
            setCurrent(prevPage)
        } 
    }

    return(
        <div>
            {user ? "hola desde home " + user :  "hola desde home" }
            {user ? (<button>Cerrar sesión</button>) : (<button onClick={handleLogin}>Iniciar sesión</button>)}
            {user ? (<button onClick={handleUserInfo}>Editar perfil</button>) : null}
            {
                user && (
                    <div>
                        <button onClick={() => { setAll(true); setCurrent('http://localhost:8001/api/publications/') }}>Ver todas</button>
                        <button onClick={() => { setAll(false); setCurrent(`http://localhost:8001/api/publication/${idUser}/`) }}>ver las mias</button>
                    </div>    
                )
            }
            <ul>
                {publications.map((pub, index) => (
                    <li key={index}>
                        <h2>{pub.title}</h2>
                        <h4>{pub.content}</h4>
                        {user && pub.user == idUser && (<button onClick={() => handleDelete(pub.id)}>borrar</button>)}
                    </li>
                    
                ))}
                {!addPub && user && (<li><button onClick={() => setAddPub(true)}>Agregar</button></li>)}
            </ul>
            <div>
                {prevPage && (<button onClick={handlePrevPage}>Anterior</button>)}
                {nextPage && (<button onClick={handleNextPage}>Siguiente</button>)}
            </div>
            {addPub && (
            <div>
                <form onSubmit={handleCreate}>
                    <input name="title" onChange={handleCreatePub}></input>
                    <input name="content" onChange={handleCreatePub}></input>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
            )}
        </div>
    )

}

export default Home