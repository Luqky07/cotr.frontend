import { useContext, createContext, useState, useEffect } from "react";
import { ApiCOTR } from "../services/ApiCOTR";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    isAuth: false,
    isVerifingToken: false,
    getAccessToken: () => {},
    saveSessionInfo: (newAccessToken, newRefreshToken) => {},
    getRefreshToken: () => {},
    logout: () => {}
});

export default function AuthProvider({children}){
    const [isAuth, setIsAuth] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [isVerifingToken, setIsVerifingToken] = useState(true);

    useEffect(() =>
    {
        setTimeout(function() {
            checkAuth()
        }, 900000)
        checkAuth()
    }, [])

    async function checkAuth() {
        setIsVerifingToken(true);
        if(accessToken && (Date.now() < jwtDecode(accessToken).exp * 1000)){
            setIsAuth(true);
            setIsVerifingToken(false);
        }else{
            const token = getRefreshToken()
            //console.log(jwtDecode(token).sub)
            if(token && (Date.now() < jwtDecode(token).exp * 1000)) {
                try{
                    const newAccessToken = await ApiCOTR.GetAccessTokenAsync(token)
                    saveSessionInfo(newAccessToken.token, token);
                    setIsVerifingToken(false);
                }
                catch(error){
                    console.log(error)
                    setIsAuth(false);
                    setIsVerifingToken(false);
                }
            }
            else {
                setIsAuth(false);
                setIsVerifingToken(false);
            }
        }
        //setIsVerifingToken(true);
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

    function logout(){
        setAccessToken(undefined);
        localStorage.removeItem("token");
        setIsAuth(false);
    }

    return (
        <AuthContext.Provider value={{ isAuth, isVerifingToken, getAccessToken, saveSessionInfo, getRefreshToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)