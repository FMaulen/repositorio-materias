import "./InputField.css"

function InputField({ label, type, name, placeholder, required = false}){

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <input 
                type={type}
                id={name} 
                name={name}
                placeholder={placeholder}
                required={required}
                className="form-input"
            />
        </div>
    );
}

export default InputField;