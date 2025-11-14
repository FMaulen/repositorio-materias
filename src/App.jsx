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
import RutaProtegida from "./components/RutaProtegida.jsx"; // Va a prohibir el acceso si no se esta logueado a las paginas que esten con esta etiqutea

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                
                <main className="main-content container py-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/materias" element={<Productos />} />
                        <Route path="/carrito" element={ <RutaProtegida> <Carrito /> </RutaProtegida> } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/subir-material" element={ <RutaProtegida> <Formulario /> </RutaProtegida> } />
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