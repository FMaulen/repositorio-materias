import './Home.css';

function Home() {
    const materias = [
        { nombre: "FUNDAMENTOS DE PROGRAMACION", codigo: "DSY-1101", archivos: 0, img: "../src/assets/python.jpeg" },
        { nombre: "NIVELACION MATEMATICA", codigo: "MAT-1111", archivos: 47, img: "../src/assets/math.jpg" },
        { nombre: "BASES DE INNOVACION", codigo: "FPY-1101", archivos: 7, img: "../src/assets/inno.jpg" },
        { nombre: "INTRODUCCION AL CLOUD COMPUTING", codigo: "BIY-1101", archivos: 4, img: "../src/assets/aws.jpg" },
        { nombre: "DESARROLLO ORIENTADO A OBJETOS", codigo: "DSY-1102", archivos: 6, img: "../src/assets/java.jpg" },
        { nombre: "BASE DE DATOS APLICADA I", codigo: "BDY-1101", archivos: 0, img: "../src/assets/oracle.jpg"},
    ];

    return (
        <div className="home-container container">
            <div className="info-banner alert alert-info my-4">
                <p className="mb-0">Aquí va a ir algo de información o información referente a los archivos</p>
            </div>

            <h2 className="text-center mb-4">Materias Disponibles</h2>
            
            <div className="row g-4">
                {materias.map((materia, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="materia-card h-100">
                            {materia.img && <img src={materia.img} alt={`Fondo para ${materia.nombre}`} className='materia-card-background'/>}
                            <div className="card-content">
                                <h3>{materia.nombre}</h3>
                                <p className="materia-codigo">{materia.codigo}</p>
                                <span className="materia-archivos">{materia.archivos} archivos</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="help-button btn btn-primary rounded-circle">?</button>
        </div>
    );
}

export default Home;