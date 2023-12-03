import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useState } from "react";

import './ChangePassword.css'
import { ApiCOTR } from "../../services/ApiCOTR";

export default function ChangePassword(){
    const auth = useAuth();
    if(auth.isAuth) return <Navigate to={'/home'}/>

    const token = new URLSearchParams(location.search).get('token');
    if (token == undefined) return <Navigate to={'/'}/>

    const goTo = useNavigate();

    const [password, setPassword] = useState({password:'',repeatPassword:''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isError: false, message: ''})

    async function handleSubmit (event) {
        setError({isError: false, message: ''});
        setIsLoading(true);
        event.preventDefault();

        if(password.password != password.repeatPassword){
            setError({isError:true, message:'Las contraseñas son diferentes'});
            setIsLoading(false);
        }
        else{
            try{
                await ApiCOTR.PostPasswordChange({token: token, password: password.password});
                alert('Contraseña actualizada');
                setIsLoading(false);
                goTo('/');
            }
            catch(error){
                setError({isError: true, message: error.message})
                setIsLoading(false);
            }
        }
        
    }

    return(
        <div className="change-page">
            <div className="page-container">
                <h1 className="change-title">Cambio de contraseña</h1>
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
                            <label>Contraseña</label>
                            <input
                                type="password" 
                                value={password.password} 
                                onChange={ (e)=>{
                                    setPassword({password: e.target.value, repeatPassword: password.repeatPassword})
                                }}
                                placeholder="******"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Repite la contraseña</label>
                            <input
                                type="password" 
                                value={password.repeatPassword} 
                                onChange={ (e)=>{
                                    setPassword({password: password.password, repeatPassword: e.target.value})
                                }}
                                placeholder="******"
                                required
                            />
                        </div>
                        <div className="submit-container">
                            {!isLoading ?
                                <input className='input-submit' type="submit" value="Cambiar contraseña"/> 
                                : 
                                <div className='login-process'>
                                    <div className='loading'></div>
                                    <h5>Estamos cambiando tu contraseña</h5>
                                </div> 
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}