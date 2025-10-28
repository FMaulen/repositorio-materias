import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('Componente Footer', () => {

  beforeEach(() => {
    render(<Footer />);
  });

  it('debería renderizar la dirección', () => {
    const elemento = screen.getByText(/Direccion: Antonio Varas 666/i);
    expect(elemento).toBeTruthy(); 
  });

  it('debería tener un enlace a Facebook', () => {
    const enlace = screen.getByRole('link', { name: /Facebook/i });
    expect(enlace).toBeTruthy();
  });

  it('el enlace a Facebook debe abrir en una nueva pestaña', () => {
    const enlace = screen.getByRole('link', { name: /Facebook/i });
    expect(enlace.getAttribute('target')).toBe('_blank');
  });
});