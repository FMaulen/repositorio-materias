import "./Carrito.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { crearPedido } from "../services/api";

function Carrito() {
  const { items, removeItem, clearCart } = useCart();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Total dinámico
  const total = items.reduce((sum, material) => {
    const precio = material.precio ?? material.price ?? 0;
    return sum + precio;
  }, 0);

  const handlePagar = async () => {
    if (!token) {
      setError("Debes iniciar sesión para pagar y descargar.");
      return;
    }

    if (items.length === 0) {
      setError("No tienes materiales en tu selección.");
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    try {
      // Tomamos un id genérico, por si tu backend usa otro nombre
      const materialIds = items.map(
        (m) => m.id ?? m.idMaterial ?? m.codigo
      );

      await crearPedido(materialIds, token);
      clearCart();
      setMensaje("Pedido creado con éxito. Ahora puedes descargar tus materiales ✅");
    } catch (err) {
      setError(err.message || "Error al crear el pedido");
    } finally {
      setLoading(false);
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
            const id =
              material.id ?? material.idMaterial ?? material.codigo ?? index;
            const titulo =
              material.titulo || material.nombre || "Material sin título";
            const fecha =
              material.fecha ||
              material.fechaArchivo ||
              (material.createdAt ? material.createdAt.slice(0, 10) : "—");
            const precio = material.precio ?? material.price ?? 0;

            return (
              <article key={id} className="carrito-card">
                <p className="title-card">{titulo}</p>
                <p className="date-card">{fecha}</p>
                <p className="price-card">
                  $
                  {precio.toLocaleString("es-CL", {
                    minimumFractionDigits: 0,
                  })}
                </p>
                {/* Si quieres seguir usando el ícono PDF */}
                <img
                  src="/pdf_icon.png"
                  alt="archivo tipo pdf"
                  className="carrito-img"
                />
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
          <p>
            Total: $
            {total.toLocaleString("es-CL", {
              minimumFractionDigits: 0,
            })}
          </p>

          {error && <p className="text-danger mt-2">{error}</p>}
          {mensaje && <p className="text-success mt-2">{mensaje}</p>}

          <button
            className="btn-pagar"
            onClick={handlePagar}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Pagar y descargar"}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Carrito;
