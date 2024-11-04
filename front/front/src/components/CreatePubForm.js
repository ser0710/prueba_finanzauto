import '../styles/Home.css'

const CreatePubForm = ({ handleCreatePub, handleCreate, handleCancel }) => {
    
    return (
        <div className="container center_btn">
            <form onSubmit={handleCreate}>
                <div>
                    <h5>título</h5>
                    <input name="title" onChange={handleCreatePub}></input>
                </div>
                <div>
                    <h5>contenido</h5>
                    <input name="content" onChange={handleCreatePub}></input>
                </div>
                <div className='center_btn'>
                    <button className='btn btn-primary' type="submit">Guardar</button>
                </div>
                <div className='center_btn'>
                    <button class="btn btn-danger" type="button" onClick={handleCancel}>Cancelar</button>
                </div>
                
            </form>
        </div>
    )

}

export default CreatePubForm