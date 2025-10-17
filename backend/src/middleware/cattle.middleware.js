
import mongoose from "mongoose";

/**
 * Middleware para validar los datos del ganado antes de crear o actualizar.
 */

export const validateCattleData = (req, res, next) => {
  const { spieces, name, healt, temperature, location, farmer } = req.body;

  // Verificar campos obligatorios
  if (!spieces || !name || !healt || !temperature || !location || !farmer) {
    return res.status(400).json({
      msg: "Todos los campos son requeridos: spieces, name, healt, temperature, location, farmer",
    });
  }

  // Validar tipo de datos
  if (typeof spieces !== "string" || typeof name !== "string" || typeof healt !== "string" || typeof location !== "string") {
    return res.status(400).json({
      msg: "Los campos spieces, name, healt y location deben ser cadenas de texto",
    });
  }

  // Validar temperatura
  if (isNaN(temperature)) {
    return res.status(400).json({
      msg: "El campo temperature debe ser un número válido",
    });
  }

  // Validar ID del farmer (en MongoDB)
  if (!mongoose.Types.ObjectId.isValid(farmer)) {
    return res.status(400).json({
      msg: "El campo farmer debe ser un ID válido de MongoDB",
    });
  }

  // Si todo está correcto, pasa al siguiente middleware o controlador
  next();
};

/**
 * Middleware para validar el parámetro ID en rutas con :id
 */
export const validateCattleId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      msg: "El parámetro 'id' es inválido o no tiene un formato válido de MongoDB",
    });
  }

  next();
};
