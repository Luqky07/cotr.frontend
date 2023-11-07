import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
export default function ProtectedRoute(){
    const auth = useAuth()

    return auth.isAuth ? <Outlet /> : <Navigate to='/'/>
}