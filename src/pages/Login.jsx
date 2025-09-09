import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';

import "./Login.css"
import { useState } from 'react';


function Login() {

    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        const hashedPassword = SHA256(password).toString();

        console.log('Contraseña original:',password)
        console.log('Contraseña encriptada (hash):',hashedPassword)
    
        alert(`Encriptacion exitosa: ${hashedPassword}`)
    };

    return (
        <div className="container-login-form">
            <form onSubmit={handleSubmit} className='form-login'>
                <div className="form-div">
                    <label htmlFor="user">Usuario</label><br />
                    <input type="text" placeholder="Ingrese usuario o correo" name="user" required /><br />
                    <label htmlFor="password" >Contraseña</label><br />
                    <input type="password" name="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese contraseña" required />
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