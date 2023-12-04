import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import './ProtectedRoute.css'

export default function ProtectedRoute(){
    const auth = useAuth();
    function handleclick(){
        auth.logout();
    }
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
                        auth.isAuth ? 
                            <>
                                <Outlet />
                                <button className="logout-button" onClick={handleclick}>
                                    Cerrar sesión
                                </button>
                            </> 
                        : <Navigate to='/'/> 
                }
            </div>
        </div>
    )
}