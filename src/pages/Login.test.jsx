import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login.jsx';

describe('Componente Login', () => {
  const renderLogin = () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  };

  it('debería renderizar los campos de usuario y contraseña', () => {
    renderLogin();
    expect(screen.getByLabelText(/Usuario/i)).toBeTruthy();
    expect(screen.getByLabelText(/Contraseña/i)).toBeTruthy();
  });

  it('debería mostrar un mensaje de error si los campos están vacíos', async () => {
    renderLogin();
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    
    fireEvent.click(submitButton);
    
    const errorMessage = await screen.findByText(/Ambos campos son obligatorios/i);
    expect(errorMessage).toBeTruthy(); 
  });

  it('NO debería mostrar el mensaje de error si los campos están llenos', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.queryByText(/Ambos campos son obligatorios/i)).toBeNull();
  });
});