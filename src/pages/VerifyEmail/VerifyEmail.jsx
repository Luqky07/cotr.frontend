import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useEffect, useState } from "react";

import './VerifyEmail.css'
import { ApiCOTR } from "../../services/ApiCOTR";

export default function VerifyEmail(){
    const auth = useAuth();
    if(auth.isAuth) return <Navigate to={'/home'}/>

    const token = new URLSearchParams(location.search).get('token');
    if (token == undefined) return <Navigate to={'/'}/>

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ''});

    useEffect(() =>{
        VerifyEmail();
    },[])

    async function VerifyEmail(){
        try{
            setError({isError: false, message: ''});
            setIsLoading(true);
            await ApiCOTR.VerifyEmailAsync({token: token});
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    return(
        <div className="verify-page">
            <div className="verify-container">
                {
                    isLoading ? 
                        <div className='login-process exercise-loading'>
                            <div className='loading'></div>
                            <h3>Estamos intentando verificar tu email</h3>
                        </div>
                    :  
                        error.isError ?
                            <>
                                <h3 className="error">
                                    {error.message}
                                </h3>
                                <h1 className="error-title"><Link to={'/'}>Accede al servicio</Link></h1>
                            </>
                        :
                        <h1 className="verify-title">Gracias por verificar tu email. <Link to={'/'}>Accede al servicio</Link></h1>
                }
            </div>
        </div>
    )
}