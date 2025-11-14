import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null); // Este estado guarda el objeto de usuario decodificado

    // Este useEffect se ejecuta solo una vez cuando la app carga por primera vez
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                // Check por si el token expiro
                if (decodedUser.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUser(decodedUser);
                } else {
                    // Si el token expiro se elimina
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Token inválido en localStorage", error);
                localStorage.removeItem('token');
            }
        }
    }, []); // El array vacio [] asegura que se ejecute solo al montar el componente (? No entiendo esto)

    // iniciar sesion
    const login = (newToken) => {
        try {
            const decodedUser = jwtDecode(newToken);
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(decodedUser); // Guardamos el usuario decodificado en el estado
        } catch (error) {
            console.error("Error decodificando el nuevo token al hacer login", error);
        }
    };

    // Cerrar sesion, se pitea el token del localSStorage
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    // Ahora compartimos tanto el token como el objeto de usuario
    const value = { token, user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// El hook personalizado no cambia
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};