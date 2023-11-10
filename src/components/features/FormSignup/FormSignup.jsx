import { useState } from "react"
import { ApiCOTR } from "../../../services/ApiCOTR"
import { useNavigate } from "react-router-dom"
import './FormSignup.css'

export default function FormSignup() {
    const [user, setUser] = useState(
        {
            nickname: '', 
            email: '',
            name: '',
            surname: '',
            secondSurname: '',
            birthdate: '',
            affiliation: '',
            password: ''
        }
    );
    const [error, setError] = useState({isError: false, message: ''})
    const [isLoading, setIsLoading] = useState(false);
    const goTo = useNavigate();

    async function handleSubmit (event) {
        setError({isError: false, message: ''});
        setIsLoading(true);
        event.preventDefault()
        try{
            await ApiCOTR.PostSignup(user)
            setIsLoading(false);
            goTo('/');
        }
        catch(error) {
            console.log(error)
            setError({isError: true, message: error.message});
            setIsLoading(false);
        }

    }

    return (
        <form className="form-signup" onSubmit={handleSubmit}>
            {
                error.isError && (
                    <h4 className="error">
                        {error.message}
                    </h4>
                )
            }
            <div className="input-group">
                <label>Nombre de usuario</label>
                <input
                    type="text" 
                    value={user.nickname} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: e.target.value, 
                                email: user.email,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="Usuario123"  
                    required
                />
            </div>
            <div className="input-group">
                <label>Email</label>
                <input
                    type="email" 
                    value={user.email} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: e.target.value,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="MiUsuario@gmail.com"  
                    required
                />
            </div>
            <div className="input-group">
                <label>Nombre</label>
                <input
                    type="text" 
                    value={user.name} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: e.target.value,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="Nombre"  
                    required
                />
            </div>
            <div className="input-group">
                <label>Primer apellido</label>
                <input
                    type="text" 
                    value={user.surname} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: user.name,
                                surname: e.target.value,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="Apellido"  
                    required
                />
            </div>
            <div className="input-group">
                <label>Segundo Apellido</label>
                <input
                    type="text" 
                    value={user.secondSurname} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: e.target.value,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="Apellido"
                />
            </div>
            <div className="input-group">
                <label>Fecha de nacimiento</label>
                <input
                    type="date" 
                    value={user.birthdate} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: e.target.value,
                                affiliation: user.affiliation,
                                password: user.password
                            }
                        )
                    }} 
                    required
                />
            </div>
            <div className="input-group">
                <label>Afiliación</label>
                <input
                    type="text" 
                    value={user.affiliation} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: e.target.value,
                                password: user.password
                            }
                        )
                    }}
                    placeholder="IES Barajas"
                />
            </div>
            <div className="input-group">
                <label>Contraseña</label>
                <input
                    type="password" 
                    value={user.password} 
                    onChange={ (e)=>{
                        setUser(
                            {
                                nickname: user.nickname, 
                                email: user.email,
                                name: user.name,
                                surname: user.surname,
                                secondSurname: user.secondSurname,
                                birthdate: user.birthdate,
                                affiliation: user.affiliation,
                                password: e.target.value
                            }
                        )
                    }}
                    placeholder="******"
                    title="La contraseña debe ser de al menos 8 caracteres y debe contener al menos una mayúscula y un número"
                    required
                />
            </div>
            <div className="submit-container">
                {!isLoading ?
                    <input className='input-submit' type="submit" value="Registrate"/> 
                    : 
                    <div className='login-process'>
                        <div className='loading'></div>
                        <h5>Estamos creando tu usuario</h5>
                    </div> 
                }
            </div>  
        </form>
    )
}