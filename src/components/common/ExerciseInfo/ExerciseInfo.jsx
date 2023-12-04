import { Link, useNavigate } from "react-router-dom";
import './ExerciseInfo.css';

export default function ExerciseInfo({exerciseData}){
    const goTo = useNavigate();
    function handleClick(){
        goTo(`/exercise/${exerciseData.exercise.exerciseId}`);
    };

    return (
        <div className="exercise-info">
            <div className="link-exercise link-languaje">
                <Link to={`/languajes/${exerciseData.languaje.languajeId}`}>
                    <h2>{exerciseData.languaje.name}</h2>
                </Link>
            </div>
            <p className="exercise-statement">{exerciseData.exercise.statement}</p>
            <div className="exercise-footer">
                <div className="link-exercise">
                    <Link to={`/user/profile/${exerciseData.author.userId}`}>
                        <h5 className="exercise-author">{exerciseData.author.nickName}</h5>
                    </Link>
                </div>
                <h5 className="exercise-creationDate">
                    {new Date(exerciseData.exercise.creationDate).toLocaleDateString('es-ES', 
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                    }
                </h5>
                <div className="exercise-button">
                    <button onClick={handleClick}>Intentar ejercicio</button>
                </div>
            </div>
        </div>
    );
}