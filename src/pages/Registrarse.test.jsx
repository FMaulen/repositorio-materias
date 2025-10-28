import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registrarse from './Registrarse.jsx';

describe('Componente Registrarse (Avanzado)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  const renderComponent = () => {
    render(
      <Router>
        <Registrarse />
      </Router>
    );
  };

  it('debería renderizar todos los campos del formulario', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Ingrese usuario/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingrese correo electrónico/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/12.345.678-5/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingrese su nombre/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingrese su apellido/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingrese contraseña/i)).toBeTruthy();
  });

  it('debería mostrar errores de validación para campos vacíos al enviar', async () => {
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText(/El usuario es obligatorio/i)).toBeTruthy();
    expect(screen.getByText(/El correo es obligatorio/i)).toBeTruthy();
    expect(screen.getByText(/El RUT es obligatorio/i)).toBeTruthy();
  });

  describe('Validación de RUT', () => {
    it('debería mostrar un error si el RUT es inválido', async () => {
      renderComponent();
      const rutInput = screen.getByPlaceholderText(/12.345.678-5/i);
      
      fireEvent.change(rutInput, { target: { value: '12345678-9' } });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.getByText(/RUT inválido/i)).toBeTruthy();
    });

    it('NO debería mostrar un error si el RUT es válido', async () => {
      renderComponent();
      const rutInput = screen.getByPlaceholderText(/12.345.678-5/i);
      
      fireEvent.change(rutInput, { target: { value: '11111111-1' } });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.queryByText(/RUT inválido/i)).toBeNull();
    });
  });

  describe('Validación de Contraseña', () => {
    it('debería mostrar un error si la contraseña es débil', async () => {
      renderComponent();
      const passwordInput = screen.getByPlaceholderText(/Ingrese contraseña/i);
      
      fireEvent.change(passwordInput, { target: { value: 'debil' } });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.getByText(/Debe tener 8 caracteres mínimo/i)).toBeTruthy();
    });
    
    it('NO debería mostrar un error si la contraseña es fuerte', async () => {
      renderComponent();
      const passwordInput = screen.getByPlaceholderText(/Ingrese contraseña/i);
      
      fireEvent.change(passwordInput, { target: { value: 'Fuerte123$' } });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.queryByText(/Debe tener 8 caracteres mínimo/i)).toBeNull();
    });
  });

  it('debería mostrar un mensaje de éxito si todos los campos son válidos', async () => {
    renderComponent();
    
    fireEvent.change(screen.getByPlaceholderText(/Ingrese usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese correo electrónico/i), { target: { value: 'test@duocuc.cl' } });
    fireEvent.change(screen.getByPlaceholderText(/12.345.678-5/i), { target: { value: '11111111-1' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su apellido/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese contraseña/i), { target: { value: 'Fuerte123$' } });

    await new Promise(resolve => setTimeout(resolve, 200));

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/Datos válidos. Registrado correctamente/i)).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('debería cambiar el tipo del input de contraseña al hacer clic en el botón de visibilidad', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText(/Ingrese contraseña/i);
    const toggleButton = screen.getByRole('button', { name: /Mostrar contraseña/i });

    expect(passwordInput.getAttribute('type')).toBe('password');

    fireEvent.click(toggleButton);

    expect(passwordInput.getAttribute('type')).toBe('text');

    fireEvent.click(toggleButton);
    
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  it('debería guardar los datos en localStorage al registrarse con éxito', async () => {
    const localStorageSpy = spyOn(localStorage, 'setItem').and.callThrough();
    
    renderComponent();
    
    fireEvent.change(screen.getByPlaceholderText(/Ingrese usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese correo electrónico/i), { target: { value: 'test@duocuc.cl' } });
    fireEvent.change(screen.getByPlaceholderText(/12.345.678-5/i), { target: { value: '11.111.111-1' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su apellido/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese contraseña/i), { target: { value: 'Fuerte123!' } });
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Datos válidos. Registrado correctamente/i)).toBeTruthy();
    }, { timeout: 2000 });
    
    expect(localStorageSpy).toHaveBeenCalled();
    
    expect(localStorageSpy).toHaveBeenCalledTimes(2);
    
    expect(localStorageSpy).toHaveBeenCalledWith('auth.token', 'demo');
    
    expect(localStorageSpy).toHaveBeenCalledWith('user.current', jasmine.any(String));
  });
});