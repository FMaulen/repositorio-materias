// url base de la api 
const API_BASE_URL = 'http://localhost:8080/api/auth';

const BASE_URL = 'http://localhost:8080';

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

//Materias
//si la respuesta no es ok, lanza un error
export async function fetchMaterias() {
  const res = await fetch(`${BASE_URL}/api/materias`);
  if (!res.ok) throw new Error('Error al obtener materias');
  return res.json();
}


//Materiales
export async function fetchMateriales(materiaId) {
  const url = materiaId
    ? `${BASE_URL}/api/materiales?materiaId=${materiaId}`
    : `${BASE_URL}/api/materiales`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener materiales');
  return res.json();
}

//subir material
export async function subirMaterial(datos, token) {
  const res = await fetch(`${BASE_URL}/api/materiales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

   if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('Error al subir material:', res.status, text);
    throw new Error('Error al subir material');
  }
  return res.json();
  
}

//Pedidos 
export async function crearPedido(materialIds, token) {
  try {
    const res = await fetch(`${BASE_URL}/api/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ materialIds }),   
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('Error al crear pedido:', res.status, text);
      
      throw new Error(`Error al crear el pedido (HTTP ${res.status})`);
    }

    // Por si el backend devuelve 204 
    if (res.status === 204) return null;

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.error('Error de red al crear pedido:', err);
    throw err;
  }
}
//api clima
export async function fetchClimaSantiago() {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=-33.45&longitude=-70.66&current_weather=true'
  
  );
  if (!res.ok) throw new Error('Error al obtener clima');
  return res.json();
}
