import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import FormSignup from "../../components/features/FormSignup/FormSignup";
import './Signup.css';

export default function Signup(){
    const auth = useAuth();

    if(auth.isAuth) return <Navigate to={'/home'}/>

    return (
        <div className="signup-page">
            <div className="page-container">
                <h1 className="login-title">Registrate</h1>
                <h3 className="signup-title">¿Ya tienes cuenta?<Link className='link' to='/'>Entra aquí</Link></h3>
                <div className='form-container'>
                    <FormSignup />
                </div>
            </div>
        </div>
    )
}