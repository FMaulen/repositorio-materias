import React, { useState } from 'react';
import './PasarelaPago.css';

const PasarelaPago = ({ total, onClose, onConfirm }) => {
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    // Formato Tarjeta: 0000 0000 0000 0000
    const handleNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Solo números
        if (val.length > 16) val = val.slice(0, 16); // Max 16
        
        // Agrega espacio cada 4
        const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardData({ ...cardData, number: formatted });
    };

    // Formato Fecha: MM/YY
    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        
        if (val.length >= 2) {
            val = val.slice(0, 2) + '/' + val.slice(2);
        }
        setCardData({ ...cardData, expiry: val });
    };

    // Solo numeros para CVV
    const handleCvvChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setCardData({ ...cardData, cvv: val });
    };

    const validate = () => {
        const newErrors = {};
        const rawNumber = cardData.number.replace(/\s/g, '');
        
        if (rawNumber.length < 16) newErrors.number = "Número incompleto";
        if (!cardData.name.trim()) newErrors.name = "Nombre requerido";
        if (cardData.expiry.length < 5) newErrors.expiry = "Inválido";
        if (cardData.cvv.length < 3) newErrors.cvv = "Inválido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsProcessing(true);

        setTimeout(async () => {
            await onConfirm(); 
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                <div className="payment-header">
                    <h2>Pasarela de Pago</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {/* TARJETA VISUAL */}
                <div className="card-preview">
                    <div className="card-chip"></div>
                    <div className="card-number-display">
                        {cardData.number || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-details-display">
                        <span>{cardData.name || 'NOMBRE TITULAR'}</span>
                        <span>{cardData.expiry || 'MM/YY'}</span>
                    </div>
                </div>

                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Número de Tarjeta</label>
                        <input 
                            type="text" 
                            className={`input-payment ${errors.number ? 'error' : ''}`}
                            placeholder="0000 0000 0000 0000"
                            value={cardData.number}
                            onChange={handleNumberChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Nombre del Titular</label>
                        <input 
                            type="text" 
                            className={`input-payment ${errors.name ? 'error' : ''}`}
                            placeholder="COMO APARECE EN LA TARJETA"
                            value={cardData.name}
                            onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Vencimiento</label>
                            <input 
                                type="text" 
                                className={`input-payment ${errors.expiry ? 'error' : ''}`}
                                placeholder="MM/YY"
                                value={cardData.expiry}
                                onChange={handleExpiryChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>CVV</label>
                            <input 
                                type="password" 
                                className={`input-payment ${errors.cvv ? 'error' : ''}`}
                                placeholder="123"
                                value={cardData.cvv}
                                onChange={handleCvvChange}
                            />
                        </div>
                    </div>

                    <div className="total-display mt-3 text-center">
                        <span className="text-secondary">Total a Pagar:</span>
                        <h3 style={{color: 'var(--color-accent)'}}>
                            ${total.toLocaleString("es-CL")}
                        </h3>
                    </div>

                    <button type="submit" className="btn-pay-final" disabled={isProcessing}>
                        {isProcessing ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Procesando...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-lock-fill"></i> Pagar Ahora
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasarelaPago;