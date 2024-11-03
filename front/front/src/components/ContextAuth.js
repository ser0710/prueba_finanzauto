import { createContext, useContext, useState } from "react"
import axios from "axios"

const Context = createContext();

export const useAuth = () => useContext(Context);

const ConstAuth = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem("user"))

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', credentials)
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('user', response.data.user)
            setUser(response.data.user)
        } catch (error){
            throw new Error(error.response.data.error)
        }
    }

    const register = async (credentials) => {
        try{
            const response = await axios.post("http://localhost:8000/api/register/", credentials)
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('user', response.data.user)
            setUser(response.data.user)
        } catch(error){
            if (error.response.data.password !== undefined){
                if(error.response.data.password.errors !== undefined){
                    throw new Error(error.response.data.password.errors);
                }
                
            }
            console.log(error.response.data)
            let errores = error.response.data
            let list_errors = []
            for (let e in errores){
                list_errors.push(errores[e][0])
            }
            throw new Error(list_errors.join(" "))
            
        }
    }

    return (
        <Context.Provider value={{ user, login, register }}>
            {children}
        </Context.Provider>
    )
}

export default ConstAuth
