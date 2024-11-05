import { useAuth } from "./ContextAuth";
const PubliList = ({ publi, handleDelete }) => {
    

    const { user, idUser } = useAuth()


    const publiFormat = Object.values(publi).map(pub =>{
        return(
            <div className="card" style={{width: '30%', marginBottom: '20px'}}>
                <div className="card-body">
                    <h2>{pub.title}</h2>
                    <h4>{pub.content}</h4>
                    <h5>{"Creado por: " + pub.username}</h5>
                    {user && pub.user == idUser && (<button class="btn btn-danger" onClick={() => handleDelete(pub.id)}>borrar</button>)}
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {publiFormat}
        </div>
    )
}

export default PubliList