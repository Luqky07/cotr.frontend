import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import './ProtectedRoute.css'

export default function ProtectedRoute(){
    const auth = useAuth();
    return (
        <div className="protected-page">
            <div className="protected-page-container">
                {
                    auth.isVerifingToken ?
                        <div className='login-process exercise-loading'>
                            <div className='loading'></div>
                            <h3>Estamos verificando tus credenciales</h3>
                        </div>
                    :
                        auth.isAuth ? <Outlet /> : <Navigate to='/'/> 
                }
            </div>
        </div>
    )
}