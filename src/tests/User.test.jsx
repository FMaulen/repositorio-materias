import { render, screen } from '@testing-library/react';
import { User } from '../components/User';
import * as api from '../services/api'; 

describe('<User />', () => {
  it('debería mostrar el nombre del usuario después de una llamada exitosa a la API', async () => {
    const mockFetchUser = vi.spyOn(api, 'fetchUser');
    mockFetchUser.mockResolvedValue({ id: 1, name: 'Cachulo' });

    render(<User userId={1} />);

    const userName = await screen.findByText(/Cachulo/i);
    expect(userName).toBeInTheDocument();
  });

  it('debería mostrar un mensaje de error si la API falla', async () => {
    const mockFetchUser = vi.spyOn(api, 'fetchUser');
    mockFetchUser.mockRejectedValue(new Error('No se pudo obtener el usuario'));

    render(<User userId={1} />);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/No se pudo obtener el usuario/i);
  });
});