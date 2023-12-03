import { useState } from "react"
import { ApiCOTR } from "../../../services/ApiCOTR"
import { useAuth } from "../../../utils/AuthProvider"
import './FormLogin.css'

export default function FormLogin() {
    const [user, setUser] = useState({user: '', password: ''})
    const [error, setError] = useState({isError: false, message: ''})
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    async function handleSubmit (event) {
        setError({isError: false, message: ''});
        setIsLoading(true);
        event.preventDefault()
        try{
            const response = await ApiCOTR.PostLogin(user)
            //console.log(response)
            setIsLoading(false);
            auth.saveSessionInfo(response.accessToken, response.refreshToken);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }

    }

    return (
        <form className="form-login" onSubmit={handleSubmit}>
            {
                error.isError && (
                    <h4 className="error">
                        {error.message}
                    </h4>
                )
            }
            <div className="input-group">
                <label>Nombre de usuario o email</label>
                <input
                    type="text" 
                    value={user.user} 
                    onChange={ (e)=>{
                        setUser({user: e.target.value, password: user.password})
                    }}
                    placeholder="MiUsuario@gmail.com"  
                    required
                />
            </div>
            <div className="input-group">
                <label>Contraseña</label>
                <input
                    type="password" 
                    value={user.password} 
                    onChange={ (e)=>{
                        setUser({user: user.user, password: e.target.value})
                    }}
                    placeholder="******"
                    required
                />
            </div>
            <div className="submit-container">
                {!isLoading ?
                    <input className='input-submit' type="submit" value="Iniciar sesión"/> 
                    : 
                    <div className='login-process'>
                        <div className='loading'></div>
                        <h5>Estamos validadando tus credenciales</h5>
                    </div> 
                }
            </div>  
        </form>
    )
}