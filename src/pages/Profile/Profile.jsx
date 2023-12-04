import { useAuth } from "../../utils/AuthProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiCOTR } from "../../services/ApiCOTR";
import ProfileInfo from "../../components/features/ProfileInfo/ProfileInfo";
import './Profile.css'
import ExerciseInfo from "../../components/common/ExerciseInfo/ExerciseInfo";

export default function Profile(){
    const auth = useAuth();
    const params = useParams();
    
    const [user, setUser] = useState();
    const [exercises, setExercises] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetUserInfo();
    },[])

    async function GetUserInfo(){
        try{
            setIsLoading(true);
            const userResponse = await ApiCOTR.GetUserInfoByIdAsync(auth.getAccessToken(), params.userId);
            console.log(userResponse);
            setUser(userResponse);
            const exercisesResponse = await ApiCOTR.GetExercisesByCreatorIdAsync(auth.getAccessToken(), params.userId)
            console.log(exercisesResponse);
            setExercises(exercisesResponse);
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    return(
        isLoading ? 
            <div className='login-process exercise-loading'>
                <div className='loading'></div>
                <h3>Estamos cargando los datos del usuario</h3>
            </div>
        :  
            error.isError ?
                <h3 className="error">
                    {error.message}
                </h3>
            :
                <>
                    <h1 className="profile-title">Información de {user.nickname}</h1>
                    <ProfileInfo userData={user}/>
                    {
                        exercises.count > 0 ?
                            <>
                                <h1 className="profile-title">Ejercicios creados por {user.nickname}</h1>
                                {
                                    exercises.exercises.map(ex => (<ExerciseInfo key={ex.exercise.exerciseId} exerciseData={ex}></ExerciseInfo>))
                                }
                            </>
                        :
                        <h3 className="error">Parece que el usuario no ha creado ningún ejercicio todavía</h3>
                    }
                </>
    );
}