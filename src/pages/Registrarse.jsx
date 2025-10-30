import { Link, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import sha256 from 'crypto-js/sha256';
import './Registrarse.css'; 
import React from 'react';

// Política fuerte: ≥8, mayúscula, minúscula, número y símbolo
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const USER_REGEX = /^[a-zA-Z0-9._]{3,}$/; // Al menos 3 caracteres, letras, números, . _


/* ===== Utilidades de RUT ===== */

//Limpia puntos y guion, quita los espacios y pone mayúscula 
function normalizeRut(rutStr) {
  if (!rutStr) return '';
  return rutStr.replace(/[.\-]/g, '').trim().toUpperCase();
}

// calcula el digito verificador usando el algoritmo ofical 

function computeDV(body) {
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const mod = 11 - (sum % 11);
  if (mod === 11) return '0';
  if (mod === 10) return 'K';
  return String(mod);
}


//valida que el cuerpo sea numerico y que el dv sea correcto
function validateRut(rutStr) {
  const clean = normalizeRut(rutStr);
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
  return computeDV(body) === dv;
}


//formatea el rut con puntos y guion 
function formatRut(rutStr) {
  const clean = normalizeRut(rutStr);
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const rev = body.split('').reverse().join('');
  const chunks = rev.match(/.{1,3}/g) || [];
  const withDots = chunks.map(c => c.split('').reverse().join('')).reverse().join('.');
  return `${withDots}-${dv}`;
}
/* ============================= */

export default function Registrarse() {
  const navigate = useNavigate(); //redirige al login tras registro exitoso

  // Estado del formulario (controlado)
  const [form, setForm] = useState({
    user: '',
    mail: '',
    rut: '',
    fname: '',
    lname: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [formMsg, setFormMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  // Validación por campo (actualiza en vivo)
  const validateField = (name, value) => {
    const val = (value ?? '').toString();

    if (name === 'user') {
      if (!val.trim()) return 'El usuario es obligatorio.';
      if (!USER_REGEX.test(val))
        return 'Debe tener al menos 3 caracteres y solo puede incluir letras, números, punto o guion bajo.';
    }
    if (name === 'fname') {
      if (!val.trim()) return 'El nombre es obligatorio.';
    }
    if (name === 'lname') {
      if (!val.trim()) return 'El apellido es obligatorio.';
    }
    if (name === 'mail') {
      if (!val.trim()) return 'El correo es obligatorio.';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val)) return 'Correo inválido.';
      const dominio = val.split('@')[1]?.toLowerCase();
      const permitidos = ['duocuc.cl'];
      if (!permitidos.includes(dominio)) return 'Solo se permite duocuc.cl.';
    }
    if (name === 'rut') {
      if (!val.trim()) return 'El RUT es obligatorio.';
      if (!validateRut(val)) return 'RUT inválido (verifique el dígito verificador).';
    }
    if (name === 'password') {
      if (!val) return 'La contraseña es obligatoria.';
      if (!STRONG_PASSWORD.test(val))
        return 'Debe tener 8 caracteres mínimo, con mayúscula, minúscula, número y símbolo.';
    }

    return '';
  };

  // onChange controlado + validación en vivo
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    const err = validateField(name, value);
    setErrors(s => ({ ...s, [name]: err }));
    setFormMsg('');
  };

  // Formatear RUT al salir
  const handleRutBlur = () => {
    if (!form.rut) return;
    const formatted = formatRut(form.rut);
    setForm(s => ({ ...s, rut: formatted }));
    const err = validateField('rut', formatted);
    setErrors(s => ({ ...s, rut: err }));
  };

  // Validación total al enviar
  const validateAll = () => {
    const next = {};
    for (const n of Object.keys(form)) {
      const err = validateField(n, form[n]);
      if (err) next[n] = err;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      setFormMsg('Corrige los errores antes de continuar.');
      return;
    }

    // Registro simulado
    const userObj = {
      user: form.user.trim(),
      mail: form.mail.trim().toLowerCase(),
      rut: formatRut(form.rut),
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      passwordHash: sha256(form.password).toString(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('user.current', JSON.stringify(userObj));
    localStorage.setItem('auth.token', 'demo');

    setFormMsg('Datos válidos. Registrado correctamente.');
    setForm({ user: '', mail: '', rut: '', fname: '', lname: '', password: '' });
    setErrors({});
    setTimeout(() => navigate('/login', { state: { email: form.mail.trim().toLowerCase() } }), 1500);
  };

  return (
    <div className="container-login-form">
      <form className="form-registro" onSubmit={handleSubmit} noValidate>
        <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
        <div className="form-div-registro">

          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            id="user"
            placeholder="Ingrese usuario"
            name="user"
            value={form.user}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.user}</small>
          <small className="hint-text">
            El usuario debe tener al menos 3 caracteres (letras, números, "." o "_").
          </small>

          <label htmlFor="mail">Correo</label>
          <input
            type="email"
            id="mail"
            placeholder="Ingrese correo electrónico"
            name="mail"
            value={form.mail}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.mail}</small>
          <small className="hint-text">
            Use su correo institucional que termine en <strong>@duocuc.cl</strong>.
          </small>

          <label htmlFor="rut">RUT</label><br />
          <input
            type="text"
            id="rut"
            placeholder="12.345.678-5"
            name="rut"
            value={form.rut}
            onChange={onChange}
            onBlur={handleRutBlur}
            required
          />
          <small className="msg-error">{errors.rut}</small><br />

          <label htmlFor="fname">Nombre</label><br />
          <input
            type="text"
            id="fname"
            placeholder="Ingrese su nombre"
            name="fname"
            value={form.fname}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.fname}</small><br />

          <label htmlFor="lname">Apellido</label><br />
          <input
            type="text"
            id="lname"
            placeholder="Ingrese su apellido"
            name="lname"
            value={form.lname}
            onChange={onChange}
            required
          />
          <small className="msg-error">{errors.lname}</small><br />

          <label htmlFor="password">Contraseña</label><br />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Ingrese contraseña"
              value={form.password}
              onChange={onChange}
              required
              minLength={8}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <small className="msg-error">{errors.password}</small><br />

          <div className="form-register-buttons">
            <button type="submit" className="register-btn">Registrarse</button>
            <Link to="/Login" className="register-btn">
              Iniciar Sesion
            </Link>
          </div>

          <p className="msg-form">{formMsg}</p>
        </div>
      </form>
    </div>
  );
}