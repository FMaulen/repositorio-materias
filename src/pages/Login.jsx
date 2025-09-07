import { Link } from 'react-router-dom';

import "./Login.css"

function Login() {
    return (
        <div className="container-login-form">
            <form className='form-login'>
                <div className="form-div">
                    <label htmlFor="user">Usuario</label><br />
                    <input type="text" placeholder="Ingrese usuario o correo" name="user" required /><br />
                    <label htmlFor="password" >Contraseña</label><br />
                    <input type="password" name="password" placeholder="Ingrese contraseña" required />
                    <div className="form-buttons">
                        <button type="submit" className='login-btn'>Iniciar Sesion</button>
                        <Link to="/registrarse" className='login-btn'>
                            Registrarse
                        </Link>
                        <label>
                            <input type="checkbox" name="remember"/> Recordar inicio de sesion
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;