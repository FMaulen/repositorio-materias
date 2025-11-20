import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaAdmin = ({ children }) => {
    const { user, token } = useAuth();

    // 1. Si no hay token, al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si hay token pero el rol NO es admin, al Home
    if (user && user.rol !== 'ROLE_ADMIN') {
        return <Navigate to="/" replace />;
    }

    // 3. Si es Admin, pase
    return children;
};

export default RutaAdmin;