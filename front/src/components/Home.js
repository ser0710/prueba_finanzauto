import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextAuth";
import { useEffect, useState } from "react";
import axios from "axios"
import PubliList from "./PubliList";
import '../styles/Home.css'
import CreatePubForm from "./CreatePubForm";

const Home = () => {
    const { user, idUser, logout } = useAuth();

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
            console.log(response)
            const newPublication = {
                id: response.data.id,
                title: newPub.title,
                content: newPub.content,
                username: response.data.username
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

    const handleCloseSession = async () => {
        try{
            await logout()
            navigate('/')
        } catch(error){
            console.log(error)
        }

    }

    return(
        <div>
            <div className="container">
                <div className="header">
                    {user ? <h1>{"Publicaciones de: " + user}</h1> :  <h1>{"Publicaciones"}</h1> }
                    <div>
                        {user ? (<button className="btn btn-secondary" onClick={handleUserInfo}>Editar perfil</button>) : null}
                        {user ? (<button className="btn btn-secondary" onClick={handleCloseSession}>Cerrar sesión</button>) : (<button className="btn btn-secondary" onClick={handleLogin}>Iniciar sesión</button>)}
                    </div>

                </div>
            </div>
            {
                user && (
                    <div className="container center_btn"  >
                        <button className="btn btn-secondary" onClick={() => { setAll(true); setCurrent('http://localhost:8001/api/publications/') }}>Ver todas</button>
                        <button className="btn btn-secondary" onClick={() => { setAll(false); setCurrent(`http://localhost:8001/api/publication/${idUser}/`) }}>ver las mias</button>
                    </div>    
                )
            }
            <div className="container">
                <PubliList publi={publications} handleDelete={handleDelete}></PubliList>
            </div>
            <div className="container center_btn">
                {!addPub && user && (<button className="btn btn-primary" onClick={() => setAddPub(true)}>Agregar</button>)}
            </div>
            

            <div className="btn-container container">
                <div id="btn_prev">
                    {prevPage && (<button className="btn btn-secondary" onClick={handlePrevPage}>Anterior</button>)}
                </div>
                <div id="btn_next">
                    {nextPage && (<button className="btn btn-secondary" onClick={handleNextPage}>Siguiente</button>)}
                </div>
                
            </div>

            {addPub && (
                <CreatePubForm handleCreatePub={handleCreatePub} handleCreate={handleCreate} handleCancel={handleCancel}></CreatePubForm>
            )}

        </div>
    )
}
export default Home