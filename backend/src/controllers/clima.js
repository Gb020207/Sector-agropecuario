// server.js (versión ESM moderna)
import express from "express";
import fetch from "node-fetch";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Coordenadas Formosa, Argentina
const LAT = -26.18;
const LON = -58.17;

// Encabezado requerido por MET Norway
const MET_HEADERS = {
  "User-Agent": "ProyectoAgroClima/1.0 (gonzalo@example.com)"
};

// ✅ Habilitar CORS ANTES de definir rutas o archivos estáticos
app.use(
  cors({
    origin: ["http://127.0.0.1:5500"], // Permite tu frontend local
    methods: ["GET"],
  })
);

// ✅ Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------------
// Función auxiliar: obtiene datos del API MET Norway
// ------------------------------------------------------------
async function fetchMetCompact() {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`;
  const res = await fetch(url, { headers: MET_HEADERS });
  if (!res.ok) throw new Error(`MET Norway responded ${res.status}`);
  return res.json();
}

// ------------------------------------------------------------
// Endpoint: Clima actual
// ------------------------------------------------------------
app.get("/api/weather/realtime", async (req, res) => {
  try {
    const data = await fetchMetCompact();
    const times = data.properties.timeseries;
    const now = times[0];
    const det = now.data.instant.details;
    const next = now.data.next_1_hours?.details || {};
    const symbol =
      now.data.next_1_hours?.summary?.symbol_code ||
      now.data.next_6_hours?.summary?.symbol_code ||
      "unknown";

    res.json({
      location: { name: "Formosa, Argentina", lat: LAT, lon: LON },
      updated_at: data.properties.meta.updated_at,
      time: now.time,
      condition: symbol,
      temperature_c: det.air_temperature,
      humidity_percent: det.relative_humidity,
      wind_speed_m_s: det.wind_speed,
      precipitation_mm_next_hour: next.precipitation_amount ?? 0
    });
  } catch (err) {
    console.error("Error en /realtime:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------
// Endpoint: Pronóstico 7 días
// ------------------------------------------------------------
app.get("/api/weather/forecast", async (req, res) => {
  try {
    const data = await fetchMetCompact();
    const series = data.properties.timeseries;
    const grouped = {};

    for (const t of series) {
      const date = t.time.split("T")[0];
      const d = t.data.instant.details;
      if (!grouped[date]) grouped[date] = { temps: [], rains: [], cond: [] };
      grouped[date].temps.push(d.air_temperature);
      if (t.data.next_1_hours?.details?.precipitation_amount)
        grouped[date].rains.push(t.data.next_1_hours.details.precipitation_amount);
      if (t.data.next_6_hours?.summary?.symbol_code)
        grouped[date].cond.push(t.data.next_6_hours.summary.symbol_code);
    }

    const forecast = Object.entries(grouped)
      .slice(0, 7)
      .map(([date, v]) => ({
        date,
        temp_min: Math.min(...v.temps).toFixed(1),
        temp_max: Math.max(...v.temps).toFixed(1),
        rain_total_mm: v.rains.reduce((a, b) => a + b, 0).toFixed(1),
        condition: v.cond[0] || "unknown"
      }));

    res.json(forecast);
  } catch (err) {
    console.error("Error en /forecast:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------
// Servir la vista principal
// ------------------------------------------------------------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "clima.html"));
});

// ------------------------------------------------------------
// Inicio del servidor
// ------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🌦 API y frontend disponibles en http://localhost:${PORT}`);
});
