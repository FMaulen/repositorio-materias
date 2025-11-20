import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext'; // hook, ganchito

function Header() {
    // le sacamos el token para saber si esta logeado y el objeto de usuario para mostar el nombre
    const { token, user, logout } = useAuth();

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'var(--color-header)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img alt="Icono DuocUC" src="/icon.png" width="60" className="d-inline-block align-top me-2"/>
                        <span>Repositorio DuocUC</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/materias">Materias</NavLink></li>

                            {token ? (
                                <>
                                    <li className="nav-item"><NavLink className="nav-link" to="/carrito">Mi Selección</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/subir-material">Subir Material</NavLink></li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-person-fill me-2" title="Usuario"></i>
                                            {user ? user.sub : 'Usuario'}
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item" onClick={logout}>Cerrar Sesión</button>
                                            </li>
                                        </ul>
                                    </li>
                                    {user && user.rol === 'ROLE_ADMIN' && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin" style={{ color: '#ffc107' }}>
                                                Admin Panel
                                            </NavLink>
                                        </li>
                                    )}
                                </>
                            ) : (
                                <>
                                    <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/registrarse">Registrarse</NavLink></li>
                                </>
                            )}
                            <li className="nav-item"><NavLink className="nav-link" to="/mapa-sitio">Mapa del Sitio</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;