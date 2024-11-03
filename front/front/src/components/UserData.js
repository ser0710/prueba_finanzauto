import { useAuth } from "./ContextAuth"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UserData = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    })

    const [iniUserData, setIniUserData] = useState(userData)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(!user) {
            navigate('/')
        } else {
            const userInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/user_data/', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    setUserData(response.data)
                    setIniUserData(response.data)
                } catch(error){
                    console.log(error)
                }
            }
            userInfo()
        }
    }, [user, navigate])


    const handleChangeData = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const dataUpdated = Object.keys(userData).reduce((acc, key) => {
                if (userData[key] !== iniUserData[key]){
                    acc[key] = userData[key];
                }
                return acc
            }, {})
            if(Object.keys(dataUpdated).length > 0){
                await axios.put('http://localhost:8000/api/update_user/', dataUpdated, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            }
            navigate('/')
        } catch(errors){
            let errs = []
            for (let e in errors.response.data){
                errs.push(errors.response.data[e][0])

            }
            
            setErrors(errs)
        }
    }

    return(
        <div>
            <h1>Perfil de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nombre de usuario</h3>
                <input name="username" value={userData.username} onChange={handleChangeData}></input>
                <h3>email</h3>
                <input name="email" value={userData.email} onChange={handleChangeData}></input>
                <h3>Nombre</h3>
                <input name="first_name" value={userData.first_name} onChange={handleChangeData}></input>
                <h3>Apellido</h3>
                <input name="last_name" value={userData.last_name} onChange={handleChangeData}></input>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            error.trim() && <li key={index}>{error.trim()}</li>
                        ))}
                    </ul>
                )}
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            
        </div>
    )

}

export default UserData