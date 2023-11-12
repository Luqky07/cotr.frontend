import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useState } from "react";

import './ChangePasswordRequest.css'
import { ApiCOTR } from "../../services/ApiCOTR";

export default function ChangePasswordRequest(){
    const auth = useAuth();
    if(auth.isAuth) return <Navigate to={'/home'}/>

    const goTo = useNavigate();

    const [email, setEmail] = useState({email:''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isError: false, message: ''})

    async function handleSubmit (event) {
        setError({isError: false, message: ''});
        setIsLoading(true);
        event.preventDefault();

        try{
            const response = await ApiCOTR.PostPasswordChangeRequest(email);
            alert('Email enviado');
            setIsLoading(false);
            goTo('/');
        }
        catch(error){
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
        
    }

    return(
        <div className="change-page">
            <div className="page-container">
                <h1 className="change-title">Petición de cambio de contraseña</h1>
                <h3 className="login-subtitle">¿Te acuerdas de tus credenciales?<Link className='link' to='/'>Entra aquí</Link></h3>
                <div className="form-container">
                    <form className="change-form" onSubmit={handleSubmit}>
                        {
                            error.isError && (
                                <h4 className="error">
                                    {error.message}
                                </h4>
                            )
                        }
                        <div className="input-group">
                            <label>Email del usuario</label>
                            <input
                                type="email" 
                                value={email.email} 
                                onChange={ (e)=>{
                                    setEmail({email: e.target.value})
                                }}
                                placeholder="MiUsuario@gmail.com"
                                required
                            />
                        </div>
                        <div className="submit-container">
                            {!isLoading ?
                                <input className='input-submit' type="submit" value="Solicitar cambio"/> 
                                : 
                                <div className='login-process'>
                                    <div className='loading'></div>
                                    <h5>Estamos enviandote un email</h5>
                                </div> 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}