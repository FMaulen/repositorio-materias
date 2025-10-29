import React, { useState, useEffect } from 'react';
import { fetchUser } from '../services/api';

export function User({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(null);
    setError(null);
    fetchUser(userId)
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  }, [userId]);

  if (error) return <div role="alert">Error: {error}</div>;
  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <p><strong>Nombre de Usuario:</strong> {user.name}</p>
    </div>
  );
}