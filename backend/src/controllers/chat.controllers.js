// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Inicializar cliente con la API Key de tu archivo .env
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Prompt del sistema (puedes personalizarlo)
const systemPrompt = `
Eres un asistente veterinario experto que responde de manera clara y profesional,
basándote en síntomas o comportamientos de animales de granja (vacas, gallinas, caballos, cabras, ovejas, cerdos, etc.).
Ofrece siempre una posible causa y una recomendación básica, sin diagnósticos médicos definitivos.
`;

// Función principal para obtener la respuesta del modelo
export const chatWithModel = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Falta el parámetro 'prompt'." });
    }

    // Inicializar el modelo
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generar contenido (respuesta)
    const result = await model.generateContent([
      { role: "user", parts: [{ text: `${systemPrompt}\nUsuario: ${prompt}` }] },
    ]);

    // Obtener el texto generado
    const output = result.response.text();

    // Enviar respuesta al cliente
    res.json({ respuesta: output });

  } catch (error) {
    console.error("Error al obtener respuesta de Gemini:", error);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
};