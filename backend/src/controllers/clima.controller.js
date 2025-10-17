// 1. Importar librerías necesarias
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();
// 2. Obtener variables de entorno (configuradas en .env)
const OWM_API_KEY = process.env.OWN_API_KEY;
if (!OWM_API_KEY) {
  console.error("Falta la clave de OpenWeatherMap");
}
// Usamos coordenadas fijas para la parcela simulada
const LATITUD_PARCELA = process.env.OWN_LAT || '26.1763'; // Buenos Aires, Argentina (Latitud de ejemplo)
const LONGITUD_PARCELA = process.env.OWN_LON || '58.1781'; // Longitud de ejemplo

/**
 * Función principal para manejar la solicitud GET a /api/clima.
 * Llama a OpenWeatherMap y procesa los datos.
 */
export const getClima = async (req, res) => {
    // Verificar si la clave API está configurada
    

    // URL base de la API One Call de OWM
    // units=metric para obtener datos en Celsius y m/s
    // lang=es para obtener las descripciones en español
    const OWM_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${LATITUD_PARCELA}&lon=${LONGITUD_PARCELA}&appid=${OWM_API_KEY}&units=metric&lang=es`;


    try {
        // 3. Realizar la petición HTTP a OpenWeatherMap
        const response = await axios.get(OWM_URL);
        const data = response.data;

        // 4. Procesamiento y Limpieza de Datos
        // Filtramos y estandarizamos solo los campos que el frontend necesita
        const climaProcesado = {
            // Datos Actuales
            actual: {
                temp_c: data.current.temp,
                condicion: data.current.weather[0].description,
                humedad_aire: data.current.humidity,
                viento_velocidad: data.current.wind_speed,
                presion: data.current.pressure,
                icono: data.current.weather[0].icon,
                // Conversión de timestamps UNIX a formato local (HH:MM)
                salida_sol: new Date(data.current.sunrise * 1000).toLocaleTimeString('es-AR'),
                puesta_sol: new Date(data.current.sunset * 1000).toLocaleTimeString('es-AR'),
                // Lógica de alerta agrícola: ¿Riesgo de aplicar agroquímicos?
                alerta_viento: data.current.wind_speed > 5 ? "Viento Fuerte (No pulverizar)" : "Viento Normal",
            },
            // Pronóstico de 7 Días
            // Usamos slice(0, 7) para limitar la respuesta a la semana
            pronostico_diario: data.daily.slice(0, 7).map(day => ({
                // Formatear fecha a algo legible (ej: Jueves 16)
                fecha: new Date(day.dt * 1000).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }),
                temp_max: day.temp.max,
                temp_min: day.temp.min,
                condicion: day.weather[0].description,
                // OWM a veces devuelve precipitación como 'rain' o 'snow', si no hay, es 0
                precipitacion_mm: (day.rain || 0) + (day.snow || 0), 
                icono: day.weather[0].icon,
                // Lógica de alerta agrícola: ¿Riesgo de helada?
                riesgo_helada: day.temp.min < 2, // Si la mínima es < 2°C, se considera riesgo
            })),
        };

        // 5. Devolver la respuesta procesada (limpia y segura) al frontend
        res.json(climaProcesado);

    } catch (error) {
        // Manejo de errores de la API externa
        console.error("Error al obtener datos de OWM:", error);
        // Devolvemos un error 503 (Servicio no disponible) si la fuente externa falla
        res.status(503).json({ error: "No se pudieron cargar los datos del clima desde la fuente externa." });
    }
};