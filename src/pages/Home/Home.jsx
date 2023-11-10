import { useAuth } from "../../utils/AuthProvider"

export default function Home(){
    const auth = useAuth()
    //console.log(auth.getAccessToken())
    return (
        <>
            <h1>Página en desarrollo</h1>
        </>
    )
}