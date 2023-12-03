import { useEffect, useState } from "react";
import { ApiCOTR } from "../../services/ApiCOTR";
import { useAuth } from "../../utils/AuthProvider";
import ExerciseInfo from "../../components/common/ExerciseInfo/ExerciseInfo";

import './Home.css';

export default function Home(){
    const auth = useAuth();

    const [exercises, setExercises] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""});

    useEffect(() =>
    {
        LoadingExercises()
    }, [])

    async function LoadingExercises(){
        try{
            setIsLoading(true);
            const response = await ApiCOTR.GetExercises(auth.getAccessToken())
            setExercises(response);
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    return (
        <div className="exercises-page">
            <div className="exercises-center">
                <div className='exercises-container'>
                    {
                        isLoading ? 
                        <div className='login-process exercise-loading'>
                            <div className='loading'></div>
                            <h3>Estamos cargando los ejercicios</h3>
                        </div>
                        :
                        <>
                            {
                                error.isError && (
                                    <h3 className="error">
                                        {error.message}
                                    </h3>
                                )
                            }
                            <h1 className="exercises-title">Ejercicios</h1>
                            {
                                exercises.exercises.map(ex => (<ExerciseInfo key={ex.exercise.exerciseId} exerciseData={ex}></ExerciseInfo>))
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}