import "./Formulario.css"
import InputField from "../components/InputField";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { subirMaterial, fetchMaterias } from "../services/api"; 

function Formulario() {
    const { token } = useAuth();
    const [materias, setMaterias] = useState([]);
    
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        precio: "",
        fecha: "",        
        materiaId: "",    
        nivel: "basico", 
        aceptoTerminos: false 
    });
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetchMaterias().then(data => setMaterias(data)).catch(console.error);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.aceptoTerminos) {
            setMensaje("Debes aceptar que el material es de tu autoría (Checkbox).");
            return;
        }
        try {
            // datos para el backend
            const payload = {
                titulo: form.titulo,
                descripcion: form.descripcion,
                precio: parseFloat(form.precio),
                materiaId: parseInt(form.materiaId),
            };
            
            await subirMaterial(payload, token);
            
            setMensaje("¡Material subido con éxito! ✅");
            // reset del formulario
            setForm({ titulo: "", descripcion: "", precio: "", fecha: "", materiaId: "", nivel: "basico", aceptoTerminos: false });
        } catch (error) {
            setMensaje("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formulario-header">
                <p>Sube tu material (Completa todos los campos)</p>
            </div>
            <div className="formulario-content">
                {/* campo texto */}
                <InputField label="Título" type="text" name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej: Guía Python" required />
                <InputField label="Descripción" type="text" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Detalle..." required />
                
                {/* campo numerico */}
                <InputField label="Precio" type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="1000" required />
                
                {/* campo fecha */}
                <div className="form-group">
                    <label className="form-label">Fecha del Apunte</label>
                    <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="form-input" required />
                </div>

                {/* select */}
                <div className="form-group">
                    <label className="form-label">Materia</label>
                    <select name="materiaId" value={form.materiaId} onChange={handleChange} className="form-input" required>
                        <option value="">Seleccione una materia...</option>
                        {materias.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>

                {/* radio buttons */}
                <div className="form-group">
                    <label className="form-label">Nivel de dificultad</label>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                        <label>
                            <input type="radio" name="nivel" value="basico" checked={form.nivel === "basico"} onChange={handleChange} /> Básico
                        </label>
                        <label>
                            <input type="radio" name="nivel" value="avanzado" checked={form.nivel === "avanzado"} onChange={handleChange} /> Avanzado
                        </label>
                    </div>
                </div>

                {/* checkbox */}
                <div className="form-group" style={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                    <input type="checkbox" id="terms" name="aceptoTerminos" checked={form.aceptoTerminos} onChange={handleChange} /> 
                    <label htmlFor="terms">Este material es de mi autoría.</label>
                </div>

                <div className="btn-div">
                    <p style={{fontWeight: 'bold', color: 'var(--color-accent)'}}>{mensaje}</p>
                    <button type="submit" className="btn-submit-formulario">Subir archivo</button>
                </div>
            </div>
        </form>
    );
}

export default Formulario;