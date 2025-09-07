import  { Link } from 'react-router-dom'
import { useState } from "react";
import "./Registrarse.css"

function Registrarse() {

    const [errors, setErrors] = useState({});  // errors: se guardan los mensajes de error 
    const [formMsg, setFormMsg] = useState(""); // formMsg: mensaje general del formulario

    const handleSubmit = (e) => {
        e.preventDefault(); // evita que se recargue la pagina
        const data = new FormData(e.target); // Obtener los datos del formulario

    // Obtener los valores de los campos del formulario
        const user = data.get("user");
        const mail = data.get("mail");
        const fname = data.get("fname");
        const lname = data.get("lname");
        const password = data.get("password");

        const newErrors = {};

    // si el campo esta vacio, se agrega un mensaje de error

        if (!user.trim()) newErrors.user = "El usuario es obligatorio.";
        if (!fname.trim()) newErrors.fname = "El nombre es obligatorio.";
        if (!lname.trim()) newErrors.lname = "El apellido es obligatorio.";

     if (!mail.trim()) {
      newErrors.mail = "El correo es obligatorio."; // si el campo esta vacio, se agrega un mensaje de error
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //formato valido de correo
      if (!regex.test(mail)) {
        newErrors.mail = "Correo invalido.";
      } else {
        const dominio = mail.split("@")[1]?.toLowerCase();
        const permitidos = ["duocuc.cl", "gmail.com", "outlook.com"];
        if (!permitidos.includes(dominio)) {
          newErrors.mail = "Solo se permiten duocuc.cl, gmail.com u outlook.com.";// dominios permitidos
        }
      }
    }

    //verifica que la contraseña tenga 8 caracteres por lo menos
    if (!password) {
      newErrors.password = "La contraseña es obligatoria."; 
    } else if (password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormMsg("Datos válidos. Enviando...");
      e.target.reset();
      setErrors({});
      setTimeout(() => setFormMsg(""), 1500);  // Limpia el mensaje despues de 1.5 segundos 
    } else {
      setFormMsg("Corrige los errores antes de continuar.");
    }
  };


    
    return (
        <div className="container-login-form">
            <form className='form-registro' onSubmit={handleSubmit} noValidate>
                <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
                <div className="form-div-registro">

                    <label htmlFor="user">Usuario</label><br />
                    <input type="text" placeholder="Ingrese usuario" name="user" required /><br />
                      <small className="msg-error">{errors.user}</small><br />


                    <label htmlFor="mail">Correo</label><br />
                    <input type="text" placeholder="Ingrese correo electronico" name="mail" required /><br />
                    <small className="msg-error">{errors.mail}</small><br />

                    <label htmlFor="fname">Nombre</label><br />
                    <input type="text" placeholder="Ingrese su nombre" name="fname" required /><br />
                    <small className="msg-error">{errors.fname}</small><br />

                    <label htmlFor="lname">Apellido</label><br />
                    <input type="text" placeholder="Ingrese su apellido" name="lname" required /><br />
                    <small className="msg-error">{errors.lname}</small><br />

                    <label htmlFor="password" >Contraseña</label><br />
                    <input type="password" name="password" placeholder="Ingrese contraseña" required minLength={8}/>
                    <small className="msg-error">{errors.password}</small><br />

                    <div className="form-register-buttons">
                        <button type="submit" className='register-btn'>Registrarse</button>
                        <Link to="/Login" className="register-btn">
                            Iniciar Sesion
                        </Link>
                    </div>
                    <p className="msg-form">{formMsg}</p>
                </div>
            </form>
        </div>
    );
}

export default Registrarse;