import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { ApiCOTR } from "../../services/ApiCOTR";
import { useEffect, useState } from "react";
import ExerciseInfo from "../../components/common/ExerciseInfo/ExerciseInfo";
import './Languaje.css'

export default function Languaje(){
    const auth = useAuth();
    const params = useParams();
    
    const [languaje, setLanguaje] = useState();
    const [exercises, setExercises] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetLanguajeInfo();
    },[])

    async function GetLanguajeInfo(){
        try{
            setIsLoading(true);
            const languajeResponse = await ApiCOTR.GetLanguajeInfoByIdAsync(auth.getAccessToken(), params.languajeId);
            setLanguaje(languajeResponse);
            const exercisesResponse = await ApiCOTR.GetExercisesByLanguajeIdAsync(auth.getAccessToken(), params.languajeId);
            setExercises(exercisesResponse);
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    return(
        <>
            <div className="nav-button">
                <Link to={'/home'}>
                    <img src="../../src/assets/hogar.svg"></img>
                </Link>
            </div>        
            {
                isLoading ? 
                    <div className='login-process exercise-loading'>
                        <div className='loading'></div>
                        <h3>Estamos cargando la información del lenguaje</h3>
                    </div>
                :  
                    error.isError ?
                        <h3 className="error">
                            {error.message}
                        </h3>
                    :
                        <>
                            <h1 className="languaje-title">{languaje.name}</h1>
                            <p className="languaje-info">{languaje.description}</p>
                            {
                                exercises.count > 0 ?
                                    <>
                                        <h1 className="languaje-title">Ejercicios de {languaje.name}</h1>
                                        {
                                            exercises.exercises.map(ex => (<ExerciseInfo key={ex.exercise.exerciseId} exerciseData={ex}/>))
                                        }
                                    </>
                                :
                                <h3 className="error">Parece que no se ha creado ningún ejercicio todavía para este lenguaje</h3>
                            }
                        </>
            }
        </>
    );
}