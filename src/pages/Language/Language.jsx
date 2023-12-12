import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { ApiCOTR } from "../../services/ApiCOTR";
import { useEffect, useState } from "react";
import ExerciseInfo from "../../components/common/ExerciseInfo/ExerciseInfo";
import './Language.css'

export default function Language(){
    const auth = useAuth();
    const params = useParams();
    
    const [language, setLanguage] = useState();
    const [exercises, setExercises] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetLanguageInfo();
    },[])

    async function GetLanguageInfo(){
        try{
            setIsLoading(true);
            const languageResponse = await ApiCOTR.GetLanguageInfoByIdAsync(auth.getAccessToken(), params.languageId);
            setLanguage(languageResponse);
            const exercisesResponse = await ApiCOTR.GetExercisesByLanguageIdAsync(auth.getAccessToken(), params.languageId);
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
                    <img src="../../../../assets/hogar.svg"></img>
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
                            <h1 className="language-title">{language.name}</h1>
                            <p className="language-info">{language.description}</p>
                            {
                                exercises.count > 0 ?
                                    <>
                                        <h1 className="language-title">Ejercicios de {language.name}</h1>
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