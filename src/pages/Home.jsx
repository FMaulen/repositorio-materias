import './Home.css';

function Home() {
    const materias = [
        { nombre: "FUNDAMENTOS DE PROGRAMACION", codigo: "DSY-1101", archivos: 0 },
        { nombre: "NIVELACION MATEMATICA", codigo: "MAT-1111", archivos: 47 },
        { nombre: "BASES DE INNOVACION", codigo: "FPY-1101", archivos: 7 },
        { nombre: "INTRODUCCION AL CLOUD COMPUTING", codigo: "BIY-1101", archivos: 4 },
        { nombre: "DESARROLLO ORIENTADO A OBJETOS", codigo: "DSY-1102", archivos: 6 },
        { nombre: "BASE DE DATOS APLICADA I", codigo: "BDY-1101", archivos: 0 },
    ];

    return (
        <div className="home-container">
            <div className="info-banner">
                <p>Aqui va a ir algo de informacion o informacion referente a los archivos</p>
            </div>

            <h2>Materias Disponibles</h2>
            <div className="materias-grid">
                {materias.map((materia, index) => (
                    <div key={index} className="materia-card">
                        <h3>{materia.nombre}</h3>
                        <p className="materia-codigo">{materia.codigo}</p>
                        <span className="materia-archivos">{materia.archivos} archivos</span>
                    </div>
                ))}
            </div>
            {/* Requisito boton de ayuda */}
            <button className="help-button">?</button>
        </div>
    );
}

export default Home;