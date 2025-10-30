import "./Carrito.css"

import { useNavigate } from "react-router-dom"


function Carrito() {
    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/';
        navigate(path);
    }
    return (
        <div className="carrito-layout">
            <main className="carrito-container">
                <h1>Material a descargar</h1>
                <section className="carrito-grid">
                    <article>
                        <p>Texto 1</p>
                    </article>
                    <article>
                        <p>Texto 2</p>
                    </article>
                    <article>
                        <p>Texto 3</p>
                    </article>
                    <article>
                        <p>Texto 4</p>
                    </article>
                    <article>
                        <p>Texto 5</p>
                    </article>
                    <article>
                        <p>Texto 6</p>
                    </article>
                </section>
            </main >
            <aside className="carrito-aside">
                <h1>Resumen</h1>
                <div className="carrito-card">
                <p className="title-card">Apuntes <br/>ciberseguridad</p>
                    <p className="date-card">06/08/2025</p>
                    <p className="price-card">$19.99</p>
                    <img src="/pdf_icon.png" alt="archivo tipo pdf" className="carrito-img"/>
                </div> 
                <div className="carrito-card">
                    <p className="title-card">Apuntes Python</p>
                    <p className="date-card">04/07/2025</p>
                    <p className="price-card">$9.99</p>
                    <img src="/pdf_icon.png" alt="archivo tipo pdf" className="carrito-img"/>
                </div> 
                <div className="carrito-card">
                    <p className="title-card">Mer, Mr BD I</p>
                    <p className="date-card">04/21/2025</p>
                    <p className="price-card">$4.99</p>
                    <img src="/pdf_icon.png" alt="archivo tipo pdf" className="carrito-img"/>
                </div> 
                <div className="carrito-card">
                    <p className="title-card">Apuntes Java</p>
                    <p className="date-card">28/03/2025</p>
                    <p className="price-card">$1.99</p>
                    <img src="/pdf_icon.png" alt="archivo tipo pdf" className="carrito-img"/>
                </div> 
                <div className="carrito-total">
                    <p>Archivos totales: 4</p>
                    <p>Total: $36.96</p>
                    <button className="btn-pagar" onClick={routeChange} value={"downloadBtn"}>Pagar y descargar</button>
                </div>
            </aside>
        </div>
    );
}

export default Carrito;