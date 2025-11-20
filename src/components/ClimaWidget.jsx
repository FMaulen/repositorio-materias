import { useEffect, useState } from "react";
import { fetchClimaSantiago } from "../services/api";

function ClimaWidget() {
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState("❓");
  const [error, setError] = useState(null);

  const getIconForWeather = (code) => {
    if (code === 0) return "☀️";              // despejado
    if (code === 1 || code === 2) return "⛅"; // algo nublado
    if (code === 3) return "☁️";              // nublado
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌦️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌧️";
    if (code === 95) return "⛈️";
    if (code === 96 || code === 99) return "🌩️";
    return "❓";
  };

  useEffect(() => {
    fetchClimaSantiago()
      .then((data) => {
        const info = data.current_weather;
        if (!info) {
          setError("Sin datos");
          return;
        }

        setTemp(info.temperature);
        setIcon(getIconForWeather(info.weathercode));
      })
      .catch(() => setError("Error al obtener clima"));
  }, []);

  if (error) return <div className="clima-widget">{error}</div>;
  if (!temp) return <div className="clima-widget">Cargando...</div>;

  return (
    <div className="clima-widget">
      <p>Clima Santiago</p>
      <p>
        <span className="clima-icon">{icon}</span>
        {temp.toFixed(1)}°C
      </p>
    </div>
  );
}

export default ClimaWidget;
