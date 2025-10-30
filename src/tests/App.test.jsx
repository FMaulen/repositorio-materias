import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App component', () => {
  it('renders header', () => {
    render(<App />);
   
    const headerElement = screen.getByText(/Repositorio DuocUC/i);
    expect(headerElement).toBeInTheDocument();
  });
});