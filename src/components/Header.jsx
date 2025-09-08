import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
    return (
        <header className="header">
            <img alt="" src="../src/assets/icon.png" className='header-img'/>
            <div className="banner">
                <h1>Repositorio Escuela Informatica Y Telecomunicaciones DuocUC</h1>
            </div>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/materias">Materias</Link> 
                <Link to="/carrito">Mi Selección</Link>
                <Link to="/subir-material">Subir Material</Link>
                <Link to="/login">Login</Link>
                <Link to="/mapa-sitio">Mapa del Sitio</Link>
            </nav>
        </header>
    );
}

export default Header;