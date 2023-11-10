//Clases
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import FormLogin from "../../components/features/FormLogin/FormLogin";

//Css propio
import './Login.css';

export default function Login(){
    const auth = useAuth()

    if(auth.isAuth) return <Navigate to={'/home'}/>

    return (
        <div className="login-page">
            <div className="page-container">
                <h1 className="login-title">Inicia Sesión</h1>
                <h3 className="signup-title">¿Aún no tienes una cuenta?<Link className='link' to='/signup'>Entra aquí</Link></h3>
                <div className='form-container'>
                    <FormLogin/>
                </div>
            </div>
        </div>
    )
}