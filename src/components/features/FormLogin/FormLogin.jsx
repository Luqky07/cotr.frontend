import { useState } from "react"
import { ApiCOTR } from "../../../services/ApiCOTR"
import { useAuth } from "../../../utils/AuthProvider"
import { useNavigate } from "react-router-dom"
import './FormLogin.css'

export default function FormLogin() {
    const [user, setUser] = useState({user: '', password: ''})
    const auth = useAuth()
    const goTo = useNavigate()

    async function handleSubmit (event) {
        event.preventDefault()
        try{
            const response = await ApiCOTR.PostLogin(user)
            //console.log(response)
            auth.saveSessionInfo(response.accessToken, response.refreshToken);
            goTo("/home")
        }
        catch(error) {
            console.log(error)
        }

    }

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            <div className="inputGroup">
                <label>Nombre de usuario</label>
                <input
                    type="text" 
                    value={user.user} 
                    onChange={ (e)=>{
                        setUser({user: e.target.value, password: user.password})
                    }}
                    required
                />
            </div>
            <div className="inputGroup">
                <label>Contraseña</label>
                <input
                    type="password" 
                    value={user.password} 
                    onChange={ (e)=>{
                        setUser({user: user.user, password: e.target.value})
                    }}
                    required
                />
            </div>
            <div className="submit">
                <input type="submit" value='Login'/>
            </div>
        </form>
    )
}