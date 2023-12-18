import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useEffect, useState } from "react";
import { ApiCOTR } from "../../services/ApiCOTR";
import { Editor } from "@monaco-editor/react";
import './EditExercise.css';

export default function EditExercise(){
    const auth = useAuth();
    const params = useParams();
    const goTo = useNavigate();

    const [test, setTest] = useState({statement: "", testCode: ""})
    const [language, setLanguage] = useState();
    const [codeError, setCodeError] = useState({isError: false, message: ""})
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetExerciseInfo();
    },[])

    async function GetExerciseInfo(){
        try{
            setIsLoading(true);
            const exerciseResponse = await ApiCOTR.GetExerciseTestByExerciseIdAsync(auth.getAccessToken(), params.exerciseId);
            setTest(
                {
                    statement: exerciseResponse.test.statement, 
                    testCode: exerciseResponse.test.testCode
                }
            );
            setLanguage(exerciseResponse.language.name);
            setIsLoading(false);
        }
        catch(error) {
            setError({isError: true, message: error.message})
            setIsLoading(false);
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            setCodeError({isError: false, message: ""});
            setIsSaving(true);
            await ApiCOTR.EditExerciseAsync(auth.getAccessToken(), test, params.exerciseId);
            alert("El ejercicio se ha actualizado exitosamente, para que otros usuarios puedan intentar resolverlo primero tienes que resolverlo tu.");
            setIsSaving(false);
            goTo(`/exercise/${params.exerciseId}`);
        }
        catch(error) {
            setCodeError({isError: true, message: error.message});
            setIsSaving(false);
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
                            {
                                codeError.isError && (
                                    <h3 className="error">
                                        {codeError.message}
                                    </h3>
                                )
                            }
                            <h1 className="create-exercise-title">Edición de ejercicios</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="statement">Enunciado del ejercicio</label>
                                    <textarea className="create-test-statement" disabled={isSaving} value={test.statement} onChange={e => setTest({statement: e.target.value, testCode: test.testCode})} required/>
                                </div>
                                <div className="input-group">
                                    <label>Test del ejercicio</label>
                                    <Editor
                                        height="80vh"
                                        theme="vs-dark"
                                        defaultLanguage={language.toLowerCase()}
                                        value={test.testCode}
                                        onChange={e => setTest({statement: test.statement, testCode: e})}
                                    >
                                    </Editor>
                                </div>
                                
                                {
                                    isSaving ?
                                        <div className='login-process exercise-loading'>
                                            <div className='loading'></div>
                                            <h3>Estamos editando tu ejercicio</h3>
                                        </div>
                                    :
                                        <div className="exercise-submit">
                                            <input type="submit" className="input-submit" value="Editar ejercicio"/>
                                        </div>
                                }
                            </form>
                        </>
            }
        </>
    );
}