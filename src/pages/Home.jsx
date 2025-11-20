import React, { useEffect, useState } from 'react';
import './Home.css';
import { User } from '../components/User';
import { fetchMaterias } from '../services/api';


function Home() {
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const imagenesPorCodigo = {
        "DSY-1101": "/python.jpeg",
        "MAT-1111": "/math.jpg",
        "FPY-1101": "/inno.jpg",
        "BIY-1101": "/aws.jpg",
        "DSY-1102": "/java.jpg",
        "BDY-1101": "/oracle.jpg"
    };

    useEffect(() => {
        const loadMaterias = async () => {
            try {
                const data = await fetchMaterias();
                setMaterias(data);
            } catch (err) {
                setError(err.message || "Error al cargar materias");
            } finally {
                setLoading(false);
            }
        };

        loadMaterias();
    }, []);

    if (loading) {
        return (
            <div className="home-container container">
                <p>Cargando materias...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container container">
                <p className="text-danger">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="home-container container">
            <div className="info-banner alert alert-info my-4">
                <p className="mb-0">Aquí va a ir algo de información o información referente a los archivos.</p>
            </div>

            <h2 className="text-center mb-4">Materias Disponibles</h2>

            <div className="row g-4">
                {materias.map((materia, index) => {
                    const nombre = materia.nombre || materia.name || "Materia sin nombre";
                    const codigo = (materia.code || materia.codigo || "").trim() || materia.id || "—";
                    const archivos = materia.archivos || materia.cantidadMateriales || 0;
                    const img = imagenesPorCodigo[codigo] || "/defaultbg.jpg";

                    return (
                        <div key={materia.id || index} className="col-12 col-md-6 col-lg-4">
                            <div className="materia-card h-100">
                                {img && (
                                    <img
                                        src={img}
                                        alt={`Fondo para ${nombre}`}
                                        className="materia-card-background"
                                    />
                                )}
                                <div className="card-content">
                                    <h3>{nombre}</h3>
                                    <p className="materia-codigo">{codigo}</p>
                                    <span className="materia-archivos">{archivos} archivos</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* DEMO API EXTERNA */}
            <div className="api-demo-section mt-5 p-4 rounded" style={{ backgroundColor: 'var(--color-card)' }}>
                <h3 className="text-center mb-3" style={{ color: 'var(--color-accent)' }}>
                    Demostración de Consumo de API
                </h3>
                <p className="text-center text-secondary mb-4">
                    Este componente realiza una llamada a una API externa para obtener datos de un usuario.
                </p>

                <div className="card shadow-sm">
                    <div className="card-body" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <User userId={2} />
                    </div>
                </div>
            </div>

            <button className="help-button btn btn-primary rounded-circle">?</button>
        </div>
    );
}

export default Home;
