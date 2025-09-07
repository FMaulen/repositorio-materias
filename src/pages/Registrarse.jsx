import  { Link } from 'react-router-dom'
let names = ["Pepe", "Juan", "Carlos"]


names.map((name) => {
    return <h1> {name} </h1>
})


function Registrarse() {
    return (
        <div className="container-login-form">
            <form className='form-registro'>
                <div className="form-div-registro">
                    <label htmlFor="user">Usuario</label><br />
                    <input type="text" placeholder="Ingrese usuario" name="user" required /><br />
                    <label htmlFor="user">Correo</label><br />
                    <input type="text" placeholder="Ingrese correo electronico" name="mail" required /><br />
                    <label htmlFor="user">Nombre</label><br />
                    <input type="text" placeholder="Ingrese su nombre" name="fname" required /><br />
                    <label htmlFor="user">Apellido</label><br />
                    <input type="text" placeholder="Ingrese su apellido" name="lname" required /><br />
                    <label htmlFor="password" >Contraseña</label><br />
                    <input type="password" name="password" placeholder="Ingrese contraseña" required />
                    <div className="form-register-buttons">
                        <button type="submit" className='register-btn'>Registrarse</button>
                        <Link to="/Login" className="register-btn">
                            Iniciar Sesion
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Registrarse;