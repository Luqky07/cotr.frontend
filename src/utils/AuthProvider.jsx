import { useContext, createContext, useState, useEffect } from "react";
import { ApiCOTR } from "../services/ApiCOTR";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    isAuth: false,
    isVerifingToken: false,
    getAccessToken: () => {},
    saveSessionInfo: (newAccessToken, newRefreshToken) => {},
    getRefreshToken: () => {}
});

export default function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [isVerifingToken, setIsVerifingToken] = useState();

    useEffect(() =>
    {
        checkAuth()
    }, [])

    async function checkAuth() {
        if(accessToken && (Date.now() < jwtDecode(accessToken).exp * 1000)){
            setIsAuth(true);
        }else{
            const token = getRefreshToken()
            //console.log(jwtDecode(token).sub)
            if(token && (Date.now() < jwtDecode(token).exp * 1000)) {
                try{
                    setIsVerifingToken(true);
                    const newAccessToken = await ApiCOTR.GetAccessToken(token)
                    saveSessionInfo(newAccessToken.token, token);
                    setIsVerifingToken(false);
                }
                catch(error){
                    console.log(error)
                    setIsAuth(false);
                    setIsVerifingToken(true);
                }
            }
            else setIsAuth(false)
        }
    }

    function saveSessionInfo(newAccessToken, newRefreshToken){
        setAccessToken(newAccessToken);
        localStorage.setItem("token", JSON.stringify(newRefreshToken));
        setIsAuth(true);
    }

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken() {
        const token = localStorage.getItem("token");
        if(token) return JSON.parse(token);
        return undefined
    }

    return (
        <AuthContext.Provider value={{ isAuth, isVerifingToken, getAccessToken, saveSessionInfo, getRefreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)