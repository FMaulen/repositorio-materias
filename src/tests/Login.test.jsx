import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';

describe('Componente Login', () => {
  
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(vi.fn());
  });

  const renderLogin = () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('debería renderizar los campos de usuario y contraseña', () => {
    renderLogin();
    expect(screen.getByLabelText(/Usuario/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingrese contraseña/i)).toBeTruthy();
  });

  it('debería mostrar un mensaje de error si los campos están vacíos', () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    fireEvent.click(submitButton);
    
    const errorMessage = screen.getByText(/Ambos campos son obligatorios/i);
    expect(errorMessage).toBeTruthy();
    
   
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('NO debería mostrar el mensaje de error si los campos están llenos', () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
   
    fireEvent.change(screen.getByPlaceholderText(/Ingrese contraseña/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    const errorMessage = screen.queryByText(/Ambos campos son obligatorios/i);
    expect(errorMessage).toBeNull();
  });
});