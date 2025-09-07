import "./Carrito.css"

function Carrito() {
    return (
        <div className="carrito-layout">
            <main className="carrito-container">
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
                <h3>Resumen</h3>
            </aside>
        </div>
    );
}

export default Carrito;