const BASE_URL = 'http://localhost:8080';
const API_AUTH_URL = `${BASE_URL}/api/auth`;

// --- AUTH ---
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Usuario o contraseña incorrectos.');
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Error al registrar.');
  }
  return response.json();
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

// --- MATERIALES ---
export async function fetchMateriales(materiaId) {
  const url = materiaId
    ? `${BASE_URL}/api/materiales?materiaId=${materiaId}`
    : `${BASE_URL}/api/materiales`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener materiales');
  return res.json();
}

export async function subirMaterial(datos, token) {
  const res = await fetch(`${BASE_URL}/api/materiales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
   if (!res.ok) throw new Error('Error al subir material');
  return res.json();
}

//Pedidos 
export async function crearPedido(materialIds, token) {
  const res = await fetch(`${BASE_URL}/api/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ materialIds }),   
  });
  if (!res.ok) throw new Error(`Error al crear el pedido`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
//api clima
export async function fetchClimaSantiago() {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=-33.45&longitude=-70.66&current_weather=true'
  );
  if (!res.ok) throw new Error('Error al obtener clima');
  return res.json();
}

export async function fetchUsuarios(token) {
  const res = await fetch(`${BASE_URL}/api/usuarios`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function eliminarUsuario(id, token) {
  await fetch(`${BASE_URL}/api/usuarios/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function cambiarRolUsuario(id, nuevoRol, token) {
  await fetch(`${BASE_URL}/api/usuarios/${id}/rol`, {
    method: 'PUT',
    headers: { 
        'Content-Type': 'text/plain', 
        Authorization: `Bearer ${token}` 
    },
    body: nuevoRol
  });
}

export async function eliminarMaterial(id, token) {
    await fetch(`${BASE_URL}/api/materiales/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
}

export async function crearMateria(datos, token) {
  const res = await fetch(`${BASE_URL}/api/materias`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error('Error al crear materia');
  return res.json();
}

export async function eliminarMateriaAdmin(id, token) {
    const res = await fetch(`${BASE_URL}/api/materias/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Error al eliminar materia');
}

export async function crearUsuarioAdmin(datos, token) {
    const res = await fetch(`${BASE_URL}/api/usuarios`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(datos),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Error al crear usuario');
    }
    return res.json();
}

export async function fetchPedidos(token) {
    const res = await fetch(`${BASE_URL}/api/pedidos`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
}

export async function eliminarPedidoAdmin(id, token) {
    await fetch(`${BASE_URL}/api/pedidos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
}