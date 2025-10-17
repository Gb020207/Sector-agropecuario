const API_URL = "http://localhost:3000/api/weather/realtime"; // tu backend Node.js

async function cargarClima() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener datos del clima");
    const data = await res.json();

    // Mostrar datos básicos
    document.getElementById("ubicacion-nombre").textContent = data.location.name;
    document.getElementById("clima-temp").textContent = `${data.temperature_c.toFixed(1)}°C`;
    document.getElementById("clima-condicion").textContent = formatearCondicion(data.condition);
    document.getElementById("clima-humedad").textContent = `${data.humidity_percent}%`;
    document.getElementById("clima-viento").textContent = `${data.wind_speed_m_s} m/s`;
    document.getElementById("clima-prob-lluvia").textContent = `${Math.round(data.precipitation_mm_next_hour * 10)}%`;
    
    // Icono según condición
    const icono = document.getElementById("clima-icon");
    icono.innerHTML = obtenerIcono(data.condition);

    // Simular presión y sol (puedes reemplazarlo luego con otra API como MET Norway sunrise)
    document.getElementById("clima-presion").textContent = `${(1000 + Math.random() * 20).toFixed(1)} hPa`;
    document.getElementById("clima-sunrise").textContent = "06:20 AM";
    document.getElementById("clima-sunset").textContent = "07:15 PM";

    // Mostrar alerta si hay lluvia
    const alertsDiv = document.getElementById("clima-alerts");
    alertsDiv.innerHTML = data.precipitation_mm_next_hour > 0
      ? `<div class="alert alert-warning"><i class="fas fa-cloud-rain me-2"></i> Posible lluvia en la próxima hora.</div>`
      : `<div class="alert alert-success"><i class="fas fa-sun me-2"></i> No hay alertas por lluvia.</div>`;
  } catch (err) {
    console.error(err);
    document.getElementById("clima-alerts").innerHTML =
      `<div class="alert alert-danger">Error al obtener datos del clima.</div>`;
  }
}

// Función para traducir el código de condición
function formatearCondicion(code) {
  const map = {
    clear_day: "Despejado",
    partlycloudy_day: "Parcialmente nublado",
    cloudy: "Nublado",
    lightrain: "Lluvia ligera",
    heavyrain: "Lluvia fuerte",
    thunderstorm: "Tormenta eléctrica",
    unknown: "Condición desconocida"
  };
  return map[code] || "Condición no identificada";
}

// Iconos dinámicos
function obtenerIcono(code) {
  if (code.includes("clear")) return `<i class="fas fa-sun text-warning"></i>`;
  if (code.includes("cloud")) return `<i class="fas fa-cloud text-secondary"></i>`;
  if (code.includes("rain")) return `<i class="fas fa-cloud-rain text-primary"></i>`;
  if (code.includes("thunder")) return `<i class="fas fa-bolt text-danger"></i>`;
  return `<i class="fas fa-cloud-sun text-muted"></i>`;
}

// Llamar automáticamente al cargar
window.addEventListener("DOMContentLoaded", cargarClima);
const API_FORECAST = "http://localhost:3000/api/weather/forecast";

async function cargarPronostico() {
  const contenedor = document.getElementById("pronostico-semanal");
  contenedor.innerHTML = `<div class="text-muted"><i class="fas fa-sync fa-spin"></i> Cargando pronóstico...</div>`;

  try {
    const res = await fetch(API_FORECAST);
    if (!res.ok) throw new Error("Error en API de pronóstico");
    const dias = await res.json();

    contenedor.innerHTML = "";

    dias.forEach(d => {
      const fecha = new Date(d.date).toLocaleDateString("es-AR", {
        weekday: "short",
        day: "numeric",
        month: "short"
      });
      const icono = obtenerIcono(d.condition);

      const card = `
        <div class="col-6 col-md-3 col-lg-2">
          <div class="card shadow-sm border-0 p-2">
            <h6 class="fw-bold text-primary">${fecha}</h6>
            <div class="display-6">${icono}</div>
            <p class="text-secondary small">${formatearCondicion(d.condition)}</p>
            <p class="fw-bold text-dark">${d.temp_max}° / ${d.temp_min}°C</p>
            <p class="text-muted small mb-0">
              <i class="fas fa-cloud-rain me-1"></i>${d.rain_total} mm
            </p>
          </div>
        </div>`;
      contenedor.insertAdjacentHTML("beforeend", card);
    });
  } catch (err) {
    contenedor.innerHTML = `<div class="text-danger">Error al cargar pronóstico.</div>`;
    console.error(err);
  }
}


