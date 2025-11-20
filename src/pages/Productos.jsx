import "./Productos.css";
import { useCart } from "../context/CartContext";
import initialMateriales from "../data/MaterialesInfo";
import { useRef } from "react";

// Componente para UNA fila/carrusel
function MaterialRow({ tituloFila, items, onAdd }) {
  const trackRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!trackRef.current) return;
    const amount = 300;
    trackRef.current.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="materiales-row">
      <div className="materiales-row-header">
        <h2>{tituloFila}</h2>
        <div className="materiales-row-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollCarousel(-1)}
            aria-label="Desplazar a la izquierda"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollCarousel(1)}
            aria-label="Desplazar a la derecha"
          >
            ›
          </button>
        </div>
      </div>

      <div className="materiales-track" ref={trackRef}>
        {items.map((material, index) => {
          const titulo =
            material.titulo || material.nombre || "Material sin título";
          const descripcion =
            material.descripcion || material.descripcionCorta || "";
          const fecha =
            material.fecha ||
            material.fechaArchivo ||
            (material.createdAt ? material.createdAt.slice(0, 10) : "—");
          const precio = material.precio ?? material.price ?? 0;
          const imagen = material.imagen || "/pdf_icon.png";
          const key = material.id || index;

          return (
            <article key={key} className="material-card">
              <div className="material-card-img-wrapper">
                <img
                  src={imagen}
                  alt={titulo}
                  className="material-card-img"
                />
              </div>

              <div className="material-card-body">
                <h3 className="material-card-title">{titulo}</h3>
                {descripcion && (
                  <p className="material-card-description">{descripcion}</p>
                )}
                <p className="material-card-date">{fecha}</p>
                <p className="material-card-price">
                  $
                  {precio.toLocaleString("es-CL", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>

              <button
                type="button"
                className="material-card-btn"
                onClick={() => onAdd(material)}
              >
                Añadir a mi selección
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Productos() {
  const { addItem } = useCart();

  // usamos directamente los datos locales
  const fundamentos = initialMateriales.filter(
    (m) => m.categoria === "Fundamentos de Programación"
  );
  const ciberseguridad = initialMateriales.filter(
    (m) => m.categoria === "Ciberseguridad"
  );
  const baseDatos = initialMateriales.filter(
    (m) => m.categoria === "Base de Datos"
  );

  return (
    <div className="materiales-page container">
      <header className="materiales-header">
        <h1>Materiales disponibles</h1>
        <p>
          Explora los materiales por ramo y añade a
          <strong> Mi selección</strong> los que quieras descargar.
        </p>
      </header>

      <MaterialRow
        tituloFila="Fundamentos de Programación"
        items={fundamentos}
        onAdd={addItem}
      />

      <MaterialRow
        tituloFila="Ciberseguridad"
        items={ciberseguridad}
        onAdd={addItem}
      />

      <MaterialRow
        tituloFila="Base de Datos"
        items={baseDatos}
        onAdd={addItem}
      />
    </div>
  );
}

export default Productos;
