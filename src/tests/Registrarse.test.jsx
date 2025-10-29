import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registrarse from '../pages/Registrarse';

describe('Componente Registrarse', () => {
  const renderComponent = () => render(<Router><Registrarse /></Router>);

  it('debería mostrar un error si el RUT es inválido', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/RUT/i), { target: { value: '11111111-2' } });
    const errorMessage = await screen.findByText(/RUT inválido/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('debería llamar a localStorage al registrarse con éxito (Prueba con Mock)', async () => {
    const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText(/RUT/i), { target: { value: '12.345.678-5' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Perez' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese contraseña/i), { target: { value: 'Fuerte123$' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await screen.findByText(/Datos válidos\. Registrado correctamente\./i);

    expect(localStorageSpy).toHaveBeenCalledWith('auth.token', 'demo');
  });
});
