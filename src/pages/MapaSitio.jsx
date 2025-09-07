import { Link } from 'react-router-dom'

import "./MapaSitio.css"

function MapaSitio() {
    return (
        <div>
            <h1>Mapa del sitio</h1>
            <ul className='mapa'>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
                <li><Link to="/subir-material">Subir material</Link></li>
                <li><Link to="/login">Iniciar Sesion</Link></li>
                <li><Link to="/registrarse">Registrarse</Link></li>
                <li><Link to="/materias">Materias</Link></li>
            </ul>
        </div>
    );
}

export default MapaSitio;