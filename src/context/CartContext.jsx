import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // materiales seleccionados

  const addItem = (material) => {
    setItems((prev) => {
      // Evitar duplicados
      if (prev.some((item) => item.id === material.id)) {
        return prev;
      }
      return [...prev, material];
    });
  };

  const removeItem = (materialId) => {
    setItems((prev) => prev.filter((item) => item.id !== materialId));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de un CartProvider');
  return ctx;
};
