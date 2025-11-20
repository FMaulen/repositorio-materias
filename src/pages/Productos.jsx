import "./Productos.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";
import { fetchMateriales } from "../services/api"; 

function MaterialRow({ tituloFila, items, onAdd }) {
  const trackRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!trackRef.current) return;
    const amount = 300;
    trackRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="materiales-row">
      <div className="materiales-row-header">
        <h2>{tituloFila}</h2>
        <div className="materiales-row-controls">
          <button type="button" className="carousel-btn" onClick={() => scrollCarousel(-1)}>‹</button>
          <button type="button" className="carousel-btn" onClick={() => scrollCarousel(1)}>›</button>
        </div>
      </div>

      <div className="materiales-track" ref={trackRef}>
        {items.map((material) => (
          <article key={material.id} className="material-card">
            <div className="material-card-img-wrapper">
              <img src="/pdf_icon.png" alt={material.titulo} className="material-card-img" />
            </div>
            <div className="material-card-body">
              <h3 className="material-card-title">{material.titulo}</h3>
              <p className="material-card-description">{material.descripcion}</p>
              <p className="material-card-price">${material.precio}</p>
              <p className="material-card-date"><small>Por: {material.usuarioNombre}</small></p>
            </div>
            <button type="button" className="material-card-btn" onClick={() => onAdd(material)}>
              Añadir a mi selección
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Productos() {
  const { addItem } = useCart();
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchMateriales()
      .then(data => setMateriales(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const addToast = (msg) => {
    const id = Date.now() + Math.random(); 
    
    setToasts((prev) => [...prev, { id, msg, closing: false }]);

    setTimeout(() => {
      setToasts((prev) => 
        prev.map((t) => (t.id === id ? { ...t, closing: true } : t))
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400); // Coincide con la duración de animation: slideOut 0.4s

    }, 3000);
  };

  const handleAddToCart = (material) => {
    addItem(material);
    addToast(`¡"${material.titulo}" agregado!`);
  };

  if(loading) return <div className="container">Cargando materiales...</div>;

  const agrupados = materiales.reduce((acc, item) => {
    const materia = item.materiaNombre || "Otros";
    if (!acc[materia]) acc[materia] = [];
    acc[materia].push(item);
    return acc;
  }, {});

  return (
    <div className="materiales-page container">
      <header className="materiales-header">
        <h1>Materiales disponibles</h1>
        <p>Explora los materiales y añádelos a <strong>Mi selección</strong>.</p>
      </header>

      {Object.keys(agrupados).length === 0 ? (
          <p className="text-center">No hay materiales subidos aún.</p>
      ) : (
          Object.keys(agrupados).map(materiaNombre => (
            <MaterialRow
                key={materiaNombre}
                tituloFila={materiaNombre}
                items={agrupados[materiaNombre]}
                onAdd={handleAddToCart}
            />
          ))
      )}

      {/* --- CONTENEDOR DE TOASTS --- */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast-notification ${toast.closing ? 'closing' : ''}`}
          >
            <span className="toast-icon">✅</span>
            <span>{toast.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;