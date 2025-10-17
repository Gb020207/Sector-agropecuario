
// server.js (unificado y corregido)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { Router } from "express";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/db.js";
import { routes } from "./src/routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales (CORS antes de las rutas)
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// -------------------------
// Datos / configuración
// -------------------------
const LAT = -26.18;
const LON = -58.17;
const MET_HEADERS = {
  "User-Agent": "ProyectoAgroClima/1.0 (gonzalo@example.com)"
};

// Catálogo de cultivos en memoria
const CROPS = [
  { _id: "1", name: "Soja", cycle: "anual", season: "verano" },
  { _id: "2", name: "Maíz", cycle: "anual", season: "verano" },
  { _id: "3", name: "Trigo", cycle: "anual", season: "invierno" },
  { _id: "4", name: "Algodón", cycle: "anual", season: "verano" },
  { _id: "5", name: "Sorgo", cycle: "anual", season: "verano" },
  { _id: "6", name: "Maní", cycle: "anual", season: "verano" },
  { _id: "7", name: "Caña de azúcar", cycle: "perenne", season: "tropical" },
  { _id: "8", name: "Arroz", cycle: "anual", season: "verano" },
  { _id: "9", name: "Girasol", cycle: "anual", season: "verano" },
  { _id: "10", name: "Pasturas", cycle: "perenne", season: "todo el año" }
];

// -------------------------
// ENDPOINTS PROPIOS (registrar ANTES de `app.use("/api", routes)`)
// -------------------------

// GET /api/crops
app.get("/api/crops", (req, res) => {
  return res.json({ success: true, total: CROPS.length, data: CROPS });
});

// POST /api/parcels (simulado)
app.post("/api/parcels", (req, res) => {
  const { name, farmer, crop, cattle } = req.body;
  if (!name || !crop) return res.status(400).json({ msg: "Faltan datos obligatorios" });

  const cropData = CROPS.find(c => c._id === crop);
  if (!cropData) return res.status(400).json({ msg: "Cultivo no encontrado" });

  const nuevaParcela = {
    id: Date.now().toString(),
    name,
    farmer,
    crop: cropData,
    cattle: cattle || [],
    createdAt: new Date().toISOString()
  };

  console.log("🌱 Nueva parcela registrada:", nuevaParcela);
  return res.json({ success: true, msg: "Parcela registrada con éxito", data: nuevaParcela });
});

// Helper: obtener datos MET Norway
async function fetchMetCompact() {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`;
  const r = await fetch(url, { headers: MET_HEADERS });
  if (!r.ok) throw new Error(`MET Norway responded ${r.status}`);
  return r.json();
}

// GET /api/weather/realtime
app.get("/api/weather/realtime", async (req, res) => {
  try {
    const data = await fetchMetCompact();
    const now = data.properties.timeseries[0];
    const det = now.data.instant.details;
    const next = now.data.next_1_hours?.details || {};
    const symbol =
      now.data.next_1_hours?.summary?.symbol_code ||
      now.data.next_6_hours?.summary?.symbol_code ||
      "unknown";

    return res.json({
      location: { name: "Formosa, Argentina", lat: LAT, lon: LON },
      updated_at: data.properties.meta.updated_at,
      time: now.time,
      condition: symbol,
      temperature_c: det.air_temperature,
      humidity_percent: det.relative_humidity,
      wind_speed_m_s: det.wind_speed,
      precipitation_mm_next_hour: next.precipitation_amount ?? 0,
      pressure_hpa: det.air_pressure_at_sea_level ?? null
    });
  } catch (err) {
    console.error("Error /api/weather/realtime:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/weather/forecast
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

    return res.json(forecast);
  } catch (err) {
    console.error("Error /api/weather/forecast:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

// -------------------------
// Montar las rutas del proyecto (las tuyas)
// -------------------------
// Importante: esto queda *después* de los endpoints que creamos arriba.
// De esta manera las rutas propias (si no manejan /weather o /crops) no
// interceptan nuestras peticiones.
app.use("/api", routes);

// -------------------------
// Servir frontend (último)
// -------------------------
// ===========================
// Servir frontend (versión compatible con Express 5)
// ===========================

const fallback = Router();

app.use(express.static(path.join(__dirname, "public")));

// 🚨 Esta versión evita el bug de path-to-regexp
fallback.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "clima.html"));
});

app.use(fallback);



// -------------------------
// Iniciar servidor y conectar DB
// -------------------------
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error conectando a DB:", err);
    process.exit(1);
  }
});
