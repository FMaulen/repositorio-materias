import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx"; 
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import Formulario from "./pages/Formulario.jsx";
import MapaSitio from "./pages/MapaSitio.jsx";
import Registrarse from "./pages/Registrarse.jsx"

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/materias" element={<Productos />} />
                        <Route path="/carrito" element={<Carrito />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/subir-material" element={<Formulario />} />
                        <Route path="/mapa-sitio" element={<MapaSitio />} />
                        <Route path="/registrarse" element={<Registrarse />} />
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </Router>
    );
}

export default App;