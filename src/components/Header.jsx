import { Link, NavLink } from 'react-router-dom';
import './Header.css'; 

function Header() {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'var(--color-header)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img alt="Icono DuocUC" src="../src/assets/icon.png" width="60" className="d-inline-block align-top me-2"/>
                        <span>Repositorio DuocUC</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/materias">Materias</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/carrito">Mi Selección</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/subir-material">Subir Material</NavLink>
                            </li>
                             <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/mapa-sitio">Mapa del Sitio</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;