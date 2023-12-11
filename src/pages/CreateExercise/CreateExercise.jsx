import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useEffect, useState } from "react";
import { ApiCOTR } from "../../services/ApiCOTR";
import { Editor } from "@monaco-editor/react";
import './CreateExercise.css';

export default function CreateExercise(){
    const auth = useAuth();
    const goTo = useNavigate();
    
    const [languajes, setLanguajes] = useState();
    const [test, setTest] = useState({languajeId: 1, statement: "", testCode: ""})
    const [codeError, setCodeError] = useState({isError: false, message: ""})
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({isError: false, message: ""})

    useEffect(() =>{
        GetLanguajeInfo();
    },[])

    async function GetLanguajeInfo(){
        try{
            setIsLoading(true);
            const languajesResponse = await ApiCOTR.GetLanguajesAsync(auth.getAccessToken());
            setLanguajes(languajesResponse);
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
            const exerciseResponse = await ApiCOTR.CreateExerciseAsync(auth.getAccessToken(), test);
            alert("El ejercicio se ha creado exitosamente, para que otros usuarios puedan intentar resolverlo primero tienes que resolverlo tu.");
            goTo(`/exercise/${exerciseResponse.exerciseId}`);
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
                            <h1 className="create-exercise-title">Creación de ejercicios</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="languajes">Selecciona una lenguaje de programación</label>
                                    <select name="languajes" onChange={e => { 
                                        setTest({languajeId: e.target.value, statement: test.statement, testCode: test.testCode})
                                        console.log(test);
                                    }} value={test.languajeId}>
                                        {
                                            languajes.map(ex => (<option key={ex.languajeId} value={ex.languajeId}>{ex.name}</option>))
                                        }
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="statement">Enunciado del ejercicio</label>
                                    <textarea className="create-test-statement" disabled={isSaving} value={test.statement} onChange={e => setTest({languajeId: test.languajeId, statement: e.target.value, testCode: test.testCode})} required/>
                                </div>
                                <div className="input-group">
                                    <label>Test del ejercicio</label>
                                    <Editor
                                        height="80vh"
                                        theme="vs-dark"
                                        language={languajes[test.languajeId - 1].name.toLowerCase()}
                                        value={languajes[test.languajeId - 1].testStart}
                                        onChange={e => setTest({languajeId: test.languajeId, statement: test.statement, testCode: e})}
                                    >
                                    </Editor>
                                </div>
                                
                                {
                                    isSaving ?
                                        <div className='login-process exercise-loading'>
                                            <div className='loading'></div>
                                            <h3>Estamos creando tu ejercicio</h3>
                                        </div>
                                    :
                                        <div className="exercise-submit">
                                            <input type="submit" className="input-submit" value="Crear ejercicio"/>
                                        </div>
                                }
                            </form>
                        </>
            }
        </>
    );
}