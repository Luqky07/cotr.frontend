import './ProfileInfo.css'

export default function ProfileInfo({userData}){
    return(
        <div className="user-info-container">
            <div className="user-info">
                <h3>Nombre</h3>
                <p>{userData.name}</p>
            </div>
            <div className="user-info">
                <h3>Apellido</h3>
                <p>{userData.surname}</p>
            </div>
            {
                userData.secondSurname != undefined && userData.secondSurname != null && (
                    <div className="user-info">
                        <h3>Segundo Apellido</h3>
                        <p>{userData.secondSurname}</p>
                    </div>
                )
            }
            <div className="user-info">
                <h3>Fecha de nacimiento</h3>
                <p>
                    {new Date(userData.birthdate).toLocaleDateString('es-ES', 
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                    }
                </p>
            </div>
            {
                userData.affiliation != undefined && userData.affiliation != null && (
                    <div className="user-info">
                        <h3>Afiliación</h3>
                        <p>{userData.affiliation}</p>
                    </div>
                )
            }
            <div className="user-info">
                <h3>Email</h3>
                <p>{userData.email}</p>
            </div>
        </div>
    )
}