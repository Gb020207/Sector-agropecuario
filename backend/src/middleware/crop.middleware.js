// crop.middleware.js
import mongoose from "mongoose";

/**
 * Middleware para validar los datos de un cultivo antes de crear o actualizar.
 */

// Validación para crear un nuevo cultivo
export const validateCropData = (req, res, next) => {
  const { name, state, amount, farmer } = req.body;

  // Verificar campos obligatorios
  if (!name || !state || !farmer) {
    return res.status(400).json({
      msg: "Los campos 'name', 'state' y 'farmer' son requeridos",
    });
  }

  // Validar tipo de datos
  if (typeof name !== "string" || typeof state !== "string") {
    return res.status(400).json({
      msg: "Los campos 'name' y 'state' deben ser cadenas de texto",
    });
  }

  // Validar cantidad (amount) si se incluye
  if (amount !== undefined && isNaN(amount)) {
    return res.status(400).json({
      msg: "El campo 'amount' debe ser un número válido",
    });
  }

  // Validar ID del farmer (MongoDB)
  if (!mongoose.Types.ObjectId.isValid(farmer)) {
    return res.status(400).json({
      msg: "El campo 'farmer' debe ser un ID válido de MongoDB",
    });
  }

  next();
};

// Validación para actualizar un cultivo
export const validateCropUpdate = (req, res, next) => {
  const { name, state, amount, farmer } = req.body;

  // Al menos un campo debe estar presente para actualizar
  if (!name && !state && !amount && !farmer) {
    return res.status(400).json({
      msg: "Debe incluir al menos un campo para actualizar (name, state, amount o farmer)",
    });
  }

  // Validaciones opcionales si se incluyen esos campos
  if (name && typeof name !== "string") {
    return res.status(400).json({ msg: "El campo 'name' debe ser una cadena de texto" });
  }

  if (state && typeof state !== "string") {
    return res.status(400).json({ msg: "El campo 'state' debe ser una cadena de texto" });
  }

  if (amount && isNaN(amount)) {
    return res.status(400).json({ msg: "El campo 'amount' debe ser un número válido" });
  }

  if (farmer && !mongoose.Types.ObjectId.isValid(farmer)) {
    return res.status(400).json({ msg: "El campo 'farmer' debe ser un ID válido de MongoDB" });
  }

  next();
};

// Validación para verificar que el ID sea válido en las rutas con
