import "./Carrito.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { crearPedido } from "../services/api";
import PasarelaPago from "../components/PasarelaPago"; 

function Carrito() {
  const { items, removeItem, clearCart } = useCart();
  const { token } = useAuth();

  const [showModal, setShowModal] = useState(false); 
  
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const total = items.reduce((sum, material) => {
    const precio = material.precio ?? material.price ?? 0;
    return sum + precio;
  }, 0);

  const handleIniciarPago = () => {
    if (!token) {
      setError("Debes iniciar sesión para pagar y descargar.");
      return;
    }
    if (items.length === 0) {
      setError("No tienes materiales en tu selección.");
      return;
    }
    setError(null);

    setShowModal(true);
  };

  const handleConfirmarPago = async () => {
    try {
      const materialIds = items.map(
        (m) => m.id ?? m.idMaterial ?? m.codigo
      );

      await crearPedido(materialIds, token);
      
      clearCart();
      setShowModal(false);
      setMensaje("¡Pago exitoso! Pedido creado correctamente. ✅");
    } catch (err) {

      setShowModal(false);
      setError(err.message || "Error al procesar el pedido");
    }
  };

  return (
    <div className="carrito-layout">
      <main className="carrito-container">
        <h1>Material a descargar</h1>

        <section className="carrito-grid">
          {items.length === 0 && (
            <p>No tienes materiales en tu selección.</p>
          )}

          {items.map((material, index) => {
            const id = material.id ?? index;
            const titulo = material.titulo || material.nombre || "Sin título";
            const precio = material.precio ?? 0;

            return (
              <article key={id} className="carrito-card">
                <p className="title-card">{titulo}</p>
                <p className="price-card">
                  ${precio.toLocaleString("es-CL")}
                </p>
                <img src="/pdf_icon.png" alt="pdf" className="carrito-img" />
                <button
                  type="button"
                  className="btn-pagar"
                  onClick={() => removeItem(id)}
                >
                  Quitar
                </button>
              </article>
            );
          })}
        </section>
      </main>

      <aside className="carrito-aside">
        <h1>Resumen</h1>

        <div className="carrito-total">
          <p>Archivos totales: {items.length}</p>
          <p>Total: ${total.toLocaleString("es-CL")}</p>

          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}

          {/* BOTON QUE ABRE EL MODAL */}
          <button
            className="btn-pagar"
            onClick={handleIniciarPago}
          >
            Pagar y descargar
          </button>
        </div>
      </aside>

      {/* RENDERIZADO CONDICIONAL DEL MODAL */}
      {showModal && (
        <PasarelaPago 
            total={total}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmarPago}
        />
      )}
    </div>
  );
}

export default Carrito;