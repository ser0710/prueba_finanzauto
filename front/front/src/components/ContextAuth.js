import { createContext, useContext, useState } from "react"
import axios from "axios"

const Context = createContext();

export const useAuth = () => useContext(Context);

export const ConstAuth = ({ children }) => {

    const [user, setUser] = useState(null)

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', credentials)
            localStorage.setItem('token', response.data.access)
            setUser(response.data.user)
        } catch (error){
            console.error(error)
        }
    }

    return (
        <Context.Provider value={{ user, login }}>
            {children}
        </Context.Provider>
    )
}
