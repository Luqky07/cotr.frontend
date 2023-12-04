import { Link } from "react-router-dom";
import './NoExist.css';

export default function NoExist(){
    return (
        <div className="protected-page">
            <div className="protected-page-container">
                <h3 className="error">La página a la que quieres acceder no existe, mejor vuelve al <Link to={'/home'}>Menú Principal</Link></h3>
            </div>
        </div>
    )
}