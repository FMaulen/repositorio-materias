import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
    fetchUsuarios, eliminarUsuario, cambiarRolUsuario, crearUsuarioAdmin,
    fetchMateriales, eliminarMaterial,
    fetchMaterias, crearMateria, eliminarMateriaAdmin, fetchPedidos, eliminarPedidoAdmin
} from "../services/api";
import "./AdminPanel.css";

function AdminPanel() {
    const { token } = useAuth();
    const [tab, setTab] = useState("usuarios"); 
    
    const [usuarios, setUsuarios] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [pedidos, setPedidos] = useState([])

    const [formUsuario, setFormUsuario] = useState({ nombreUsuario: "", email: "", password: "", rut: "", nombre: "", apellido: "" });
    const [formMateria, setFormMateria] = useState({ name: "", code: "" });
    const [mensaje, setMensaje] = useState("");

    const cargarDatos = () => {
        fetchUsuarios(token).then(setUsuarios).catch(console.error);
        fetchMateriales().then(setMateriales).catch(console.error);
        fetchMaterias().then(setMaterias).catch(console.error);
        fetchPedidos(token).then(setPedidos);
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleCrearUsuario = async (e) => {
        e.preventDefault();
        try {
            await crearUsuarioAdmin(formUsuario, token);
            setMensaje("Usuario creado ✅");
            setFormUsuario({ nombreUsuario: "", email: "", password: "", rut: "", nombre: "", apellido: "" });
            cargarDatos();
        } catch (error) { setMensaje("Error: " + error.message); }
    };

    const handleBorrarUsuario = async (id) => {
        if(!window.confirm("¿Eliminar usuario?")) return;
        await eliminarUsuario(id, token);
        cargarDatos();
    };

    const handleHacerAdmin = async (id) => {
        await cambiarRolUsuario(id, "ROLE_ADMIN", token);
        cargarDatos();
    };

    const handleQuitarAdmin = async (id) => {
        if(!window.confirm("¿Quitar permisos de Admin? Volverá a ser usuario normal.")) return;
        await cambiarRolUsuario(id, "ROLE_USER", token); 
        cargarDatos();
    };

    const handleCrearMateria = async (e) => {
        e.preventDefault();
        try {
            await crearMateria(formMateria, token);
            setMensaje("Materia creada ✅");
            setFormMateria({ name: "", code: "" });
            cargarDatos();
        } catch (error) { setMensaje("Error al crear materia"); }
    };

    const handleBorrarMateria = async (id) => {
        if(!window.confirm("¿Borrar materia? Se perderán los materiales asociados si no hay cascada.")) return;
        try {
            await eliminarMateriaAdmin(id, token);
            cargarDatos();
        } catch (error) { alert("No se pudo borrar (quizas tiene archivos asociados)"); }
    };

    const handleBorrarMaterial = async (id) => {
        if(!window.confirm("¿Eliminar archivo?")) return;
        await eliminarMaterial(id, token);
        cargarDatos();
    };

    const handleBorrarPedido = async (id) => {
        if(!window.confirm("¿Eliminar este registro de venta?")) return;
        await eliminarPedidoAdmin(id, token);
        cargarDatos();
    };

    return (
        <div className="container mt-4 admin-container">
            <div className="admin-header text-center">
                <h1 className="admin-title">Panel de Administración</h1>
                <p className="text-secondary">Gestión integral del sistema</p>
            </div>
            
            {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

            {/* PESTAÑAS */}
            <div className="admin-tabs justify-content-center">
                <button className={`btn-tab ${tab === 'usuarios' ? 'btn-tab-active' : ''}`} onClick={() => setTab("usuarios")}>
                    <i className="bi bi-people-fill me-2"></i> Usuarios
                </button>
                <button className={`btn-tab ${tab === 'materias' ? 'btn-tab-active' : ''}`} onClick={() => setTab("materias")}>
                    <i className="bi bi-book-half me-2"></i> Materias
                </button>
                <button className={`btn-tab ${tab === 'materiales' ? 'btn-tab-active' : ''}`} onClick={() => setTab("materiales")}>
                    <i className="bi bi-folder-fill me-2"></i> Archivos
                </button>
                <button className={`btn-tab ${tab === 'pedidos' ? 'btn-tab-active' : ''}`} onClick={() => setTab("pedidos")}>
                    <i className="bi bi-cart-check-fill me-2"></i> Ventas
                </button>
            </div>

            {/* === VISTA USUARIOS === */}
            {tab === "usuarios" && (
                <>
                    <div className="admin-card">
                        <h3>Crear Nuevo Usuario</h3>
                        <form className="admin-form" onSubmit={handleCrearUsuario}>
                            <input type="text" placeholder="Usuario" className="form-control-dark" value={formUsuario.nombreUsuario} onChange={e => setFormUsuario({...formUsuario, nombreUsuario: e.target.value})} required />
                            <input type="email" placeholder="Email" className="form-control-dark" value={formUsuario.email} onChange={e => setFormUsuario({...formUsuario, email: e.target.value})} required />
                            <input type="password" placeholder="Password" className="form-control-dark" value={formUsuario.password} onChange={e => setFormUsuario({...formUsuario, password: e.target.value})} required />
                            <input type="text" placeholder="RUT" className="form-control-dark" value={formUsuario.rut} onChange={e => setFormUsuario({...formUsuario, rut: e.target.value})} required />
                            <input type="text" placeholder="Nombre" className="form-control-dark" value={formUsuario.nombre} onChange={e => setFormUsuario({...formUsuario, nombre: e.target.value})} required />
                            <input type="text" placeholder="Apellido" className="form-control-dark" value={formUsuario.apellido} onChange={e => setFormUsuario({...formUsuario, apellido: e.target.value})} required />
                            <button type="submit" className="btn-create">Crear Usuario</button>
                        </form>
                    </div>

                    <div className="table-responsive">
                        <table className="table-dark-custom">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Usuario</th><th>Email</th><th>Rol</th><th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.nombreUsuario}</td>
                                        <td>{u.email}</td>
                                        <td><span className={`badge-role ${u.rol==='ROLE_ADMIN'?'role-admin':'role-user'}`}>{u.rol}</span></td>
                                        <td>
                                            {/* LOGICA CONDICIONAL DE BOTONES */}
                                            {u.rol === 'ROLE_USER' ? (
                                                // Si es User, mostramos botón para HACER ADMIN (Amarillo)
                                                <button 
                                                    className="btn-action btn-edit" 
                                                    onClick={() => handleHacerAdmin(u.id)} 
                                                    title="Ascender a Admin"
                                                >
                                                    <i className="bi bi-shield-plus"></i> 
                                                </button>
                                            ) : (
                                                // Si es Admin, mostramos botón para HACER USUARIO (Gris/Azul oscuro)
                                                <button 
                                                    className="btn-action" 
                                                    style={{ backgroundColor: '#4A5568', color: 'white' }}
                                                    onClick={() => handleQuitarAdmin(u.id)} 
                                                    title="Degradar a Usuario"
                                                >
                                                    <i className="bi bi-shield-minus"></i> 
                                                </button>
                                            )}

                                            {/* Botón Eliminar siempre visible */}
                                            <button 
                                                className="btn-action btn-delete" 
                                                onClick={() => handleBorrarUsuario(u.id)} 
                                                title="Eliminar Usuario"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* VISTA MATERIAS */}
            {tab === "materias" && (
                <>
                    <div className="admin-card">
                        <h3>Crear Nueva Materia</h3>
                        <form className="admin-form" onSubmit={handleCrearMateria}>
                            <input type="text" placeholder="Nombre Materia (ej: Bases de Datos)" className="form-control-dark" value={formMateria.name} onChange={e => setFormMateria({...formMateria, name: e.target.value})} required />
                            <input type="text" placeholder="Código (ej: BDY-1101)" className="form-control-dark" value={formMateria.code} onChange={e => setFormMateria({...formMateria, code: e.target.value})} required />
                            <button type="submit" className="btn-create">Crear Materia</button>
                        </form>
                    </div>

                    <div className="table-responsive">
                        <table className="table-dark-custom">
                            <thead>
                                <tr>
                                    <th>ID</th><th>Nombre</th><th>Código</th><th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materias.map(m => (
                                    <tr key={m.id}>
                                        <td>{m.id}</td>
                                        <td>{m.name}</td>
                                        <td>{m.code}</td>
                                        <td>
                                            <button className="btn-action btn-delete" onClick={() => handleBorrarMateria(m.id)}>
                                                <i className="bi bi-trash-fill"></i> Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* === VISTA ARCHIVOS === */}
            {tab === "materiales" && (
                <div className="table-responsive">
                    <table className="table-dark-custom">
                        <thead>
                            <tr>
                                <th>ID</th><th>Título</th><th>Materia</th><th>Autor</th><th>Precio</th><th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materiales.map(m => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.titulo}</td>
                                    <td>{m.materiaNombre}</td>
                                    <td>{m.usuarioNombre}</td>
                                    <td>${m.precio}</td>
                                    <td>
                                        <button className="btn-action btn-delete" onClick={() => handleBorrarMaterial(m.id)}>
                                            <i className="bi bi-trash-fill"></i> Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        {tab === "pedidos" && (
            <div className="table-responsive">
                <table className="table-dark-custom">
                    <thead>
                        <tr>
                            <th>ID</th><th>Fecha</th><th>Total</th><th>Items</th><th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{new Date(p.fechaCreacion).toLocaleDateString()}</td>
                                <td>${p.total}</td>
                                <td>
                                    <small>{p.materiales.map(m => m.titulo).join(", ")}</small>
                                </td>
                                <td>
                                    <button className="btn-action btn-delete" onClick={() => handleBorrarPedido(p.id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
    )
}

export default AdminPanel;