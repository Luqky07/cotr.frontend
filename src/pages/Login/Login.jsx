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
        <div className="loginPage">
            <div className="pageContainer">
                <h1> Inicia Sesión</h1>
                <h3>¿Aún no tienes una cuenta?<Link className='link' to='/signup'>Entra aquí</Link></h3>
                <div className='formContainer'>
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}