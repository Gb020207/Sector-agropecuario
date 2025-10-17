import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const LAT = -26.18;
const LON = -58.17;
const HEADERS = { "User-Agent": "ProyectoAgroClima/1.0 (gonzalo@example.com)" };

// Función auxiliar para consultar API MET Norway
async function getMetData() {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error("Error en MET Norway");
  return res.json();
}

// ✅ Clima actual
app.get("/api/weather/realtime", async (_, res) => {
  try {
    const data = await getMetData();
    const current = data.properties.timeseries[0];
    const d = current.data.instant.details;
    const next = current.data.next_1_hours?.details || {};
    const symbol = current.data.next_1_hours?.summary?.symbol_code || "unknown";

    res.json({
      location: { name: "Formosa, Argentina", lat: LAT, lon: LON },
      updated_at: data.properties.meta.updated_at,
      time: current.time,
      condition: symbol,
      temperature_c: d.air_temperature,
      humidity_percent: d.relative_humidity,
      wind_speed_m_s: d.wind_speed,
      precipitation_mm_next_hour: next.precipitation_amount ?? 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Pronóstico 7 días
app.get("/api/weather/forecast", async (_, res) => {
  try {
    const data = await getMetData();
    const grouped = {};

    for (const item of data.properties.timeseries) {
      const date = item.time.split("T")[0];
      const d = item.data.instant.details;
      if (!grouped[date]) {
        grouped[date] = {
          temps: [],
          rains: [],
          winds: [],
          condition: item.data.next_6_hours?.summary?.symbol_code ||
                     item.data.next_1_hours?.summary?.symbol_code || "unknown"
        };
      }
      grouped[date].temps.push(d.air_temperature);
      grouped[date].winds.push(d.wind_speed);
      if (item.data.next_1_hours?.details?.precipitation_amount)
        grouped[date].rains.push(item.data.next_1_hours.details.precipitation_amount);
    }

    const forecast = Object.entries(grouped)
      .slice(0, 7)
      .map(([date, v]) => ({
        date,
        temp_min: Math.min(...v.temps).toFixed(1),
        temp_max: Math.max(...v.temps).toFixed(1),
        rain_total: v.rains.length
          ? v.rains.reduce((a, b) => a + b, 0).toFixed(1)
          : "0.0",
        wind_avg: (v.winds.reduce((a, b) => a + b, 0) / v.winds.length).toFixed(1),
        condition: v.condition
      }));

    res.json(forecast);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`🌦 API AgroSmart corriendo en http://localhost:${PORT}`)
);


app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
