import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useEffect, useState } from "react";
import { ApiCOTR } from "../../services/ApiCOTR";
import { Editor } from "@monaco-editor/react";
import './TryExercise.css'
import { jwtDecode } from "jwt-decode";

export default function TryExercise(){
    const auth = useAuth();
    const params = useParams();
    
    const [exercise, setExercise] = useState(undefined);
    const [code, setCode] = useState({code: ""})
    const [codeError, setCodeError] = useState({isError: false, message: ""})
    const [isValidating, setIsValidating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetExerciseInfo();
    },[])

    async function GetExerciseInfo(){
        try{
            setIsLoading(true);
            const exercisesResponse = await ApiCOTR.GetExerciseByExerciseIdAsync(auth.getAccessToken(), params.exerciseId);
            setExercise(exercisesResponse);
            setCode({code: exercisesResponse.languaje.codeStart})
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    async function handleclick(){
        try{
            setCodeError({isError: false, message: ""});
            setIsValidating(true);
            await ApiCOTR.TryExerciseAsync(auth.getAccessToken(), params.exerciseId, code);
            setIsValidating(false);
            alert("Ejercicio resuelto")
        }
        catch(error) {
            setCodeError({isError: true, message: error.message});
            setIsValidating(false);
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
                        <h3>Estamos cargando la información del ejercicio</h3>
                    </div>
                :  
                    error.isError ?
                        <h3 className="error">
                            {error.message}
                        </h3>
                    :
                        <>
                            <h1 className="try-exercise-title">Enunciado</h1>
                            <p className="try-exercise-statement">{exercise.exercise.statement}</p>
                            {
                                codeError.isError && (
                                    <h3 className="error">
                                        {
                                            codeError.type && (<span>codeError.type</span>)
                                        }
                                        {codeError.message}
                                    </h3>
                                )
                            }
                            <Editor
                                height="80vh"
                                theme="vs-dark"
                                defaultLanguage={exercise.languaje.name.toLowerCase()}
                                defaultValue={exercise.languaje.codeStart}
                                onChange={e => setCode({code: e})}
                            >

                            </Editor>
                            {
                                isValidating ?
                                    <div className='login-process exercise-loading'>
                                        <div className='loading'></div>
                                        <h3>Estamos probando tu ejercicio</h3>
                                    </div>
                                :
                                    <div className="button-container">
                                        <div className="exercise-submit">
                                            <button className="input-submit" onClick={handleclick}>Intentar ejercicio</button>
                                            {
                                                exercise.author.userId == jwtDecode(auth.getAccessToken()).sub && (
                                                    <div className="nav-button">
                                                        <Link to={`/exercise/${exercise.exercise.exerciseId}/edit`}>
                                                            <img src="../../../../assets/lapiz.svg"></img>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                            }
                        </>
            }
        </>
    );
}