import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './styles.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';  // Este es nuevo, metemos el provider
import { CartProvider } from './context/CartContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  { /* Y envolvemos la app en el coso */ }
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
