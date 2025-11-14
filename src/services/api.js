// url base de la api 
const API_BASE_URL = 'http://localhost:8080/api/auth';

/**
 * Función para registrar un nuevo usuario.
 * @param {object} userData - Datos del formulario de registro.
 * @returns {Promise<object>} - La respuesta del servidor (que incluye el token).
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Si el servidor responde con un error (ej: 400, 500), lo manejamos aquí.
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar el usuario.');
    }

    return response.json(); // Devuelve los datos de la respuesta (ej: { token: "..." })
  } catch (error) {
    console.error('Error en registerUser:', error);
    // Re-lanzamos el error para que el componente que llama pueda manejarlo.
    throw error;
  }
};

/**
 * Función para iniciar sesión.
 * @param {object} credentials - Credenciales del usuario { nombreUsuario, password }.
 * @returns {Promise<object>} - La respuesta del servidor (que incluye el token).
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // errores de login, credenciales incorrectas (401 o 403)
      throw new Error('Usuario o contraseña incorrectos.');
    }

    return response.json();
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
};

// despues borro esto, no molesta (Creo)
export const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener el usuario');
  }
  return response.json();
};