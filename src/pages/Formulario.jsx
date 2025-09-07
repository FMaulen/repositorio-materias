import "./Formulario.css"
import InputField from "../components/InputField";

function Formulario() {
    return (
        <form>
            <div className="formulario-header">
                <p>Rellena los campos y selecciona tu archivo para subir el material</p>
            </div>
                <div className="formulario-content">
                    <InputField label={"Nombre"} type={"text"} name={"nombre"} placeholder={"Brr Brr Patapim"} required/> 
                    <InputField label={"Rut"} type={"text"} name={"rut"} placeholder={"12.345.678-9"} required/> 
                    <InputField label={"Fecha del archivo"} type={"date"} name={"fecha"}/> 
                    <InputField label={"Asignatura"} type={"text"} name={"asignatura"} placeholder={"Pollo Asado II"} required/> 
                    <InputField label={"Titulo a mostrar del archivo"} type={"text"} name={"Titulo"} placeholder={"Apuntes examen Pollo Asado II"}/> 
                    <InputField label={"Ingresa un numerito"} type={"number"} name={"nombre"} placeholder={"Homero Sinson"}/> 
                    <div className="btn-div">
                        <button type="submit" className="btn-submit-formulario">Subir archivo</button>
                    </div>
                </div>
        </form>
    );
}

export default Formulario;