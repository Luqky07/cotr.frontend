import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

export default function Signup(){
    const auth = useAuth()

    if(auth.isAuth) return <Navigate to={'/home'}/>

    return (
        <>
            <h1>Signup</h1>
        </>
    )
}