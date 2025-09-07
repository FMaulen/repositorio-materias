import { Link } from 'react-router-dom'

import "./MapaSitio.css"

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
            <div className= 'lorem'> 


                <h2>Mision</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur laborum fugiat odio, corrupti labore molestiae magni magnam perspiciatis nostrum temporibus sapiente mollitia repellendus beatae quam eos sed dignissimos enim quidem!
                </p>

                <h2>Vision</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti enim dolores beatae! Quae provident, doloremque facere, modi sapiente ex vitae accusamus, placeat dolor ratione magni labore laboriosam suscipit id quas.
                </p>

                <h2>Descripcion</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, delectus facere, perferendis, dolore non modi consequatur quidem accusamus fugiat mollitia culpa voluptatibus ipsam. Quaerat consequuntur corrupti est possimus placeat.
                </p>

            </div>

        </div>
    );
}

export default MapaSitio;
