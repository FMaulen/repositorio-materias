import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        // si no hay token se rediririge al login
        // y se guarda la ubicacion donde estaba para rederigirlo despues del login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // si hay token se renderiza el componente hijo que se paso
    return children;
};

export default RutaProtegida;