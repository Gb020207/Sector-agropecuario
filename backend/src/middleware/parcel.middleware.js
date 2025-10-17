// parcel.middleware.js
import mongoose from "mongoose";

/**
 * Middleware para validar los datos de una parcela antes de crear o actualizar.
 */

// Validación para crear una nueva parcela
export const validateParcelData = (req, res, next) => {
  const { name, farmer, crop, cattle } = req.body;

  // Verificar campos requeridos
  if (!name || !farmer || !crop || !cattle) {
    return res.status(400).json({
      msg: "Los campos 'name', 'farmer', 'crop' y 'cattle' son requeridos",
    });
  }

  // Validar tipo de datos
  if (typeof name !== "string") {
    return res.status(400).json({
      msg: "El campo 'name' debe ser una cadena de texto",
    });
  }

  // Validar IDs (MongoDB)
  const invalidIds = [];
  if (!mongoose.Types.ObjectId.isValid(farmer)) invalidIds.push("farmer");
  if (!mongoose.Types.ObjectId.isValid(crop)) invalidIds.push("crop");
  if (!mongoose.Types.ObjectId.isValid(cattle)) invalidIds.push("cattle");

  if (invalidIds.length > 0) {
    return res.status(400).json({
      msg: `Los siguientes campos deben ser IDs válidos de MongoDB: ${invalidIds.join(", ")}`,
    });
  }

  next();
};

// Validación para actualizar una parcela
export const validateParcelUpdate = (req, res, next) => {
  const { name, crop, cattle } = req.body;

  // Debe haber al menos un campo para actualizar
  if (!name && !crop && !cattle) {
    return res.status(400).json({
      msg: "Debe incluir al menos un campo para actualizar (name, crop o cattle)",
    });
  }

  // Validar tipo de datos si se incluyen
  if (name && typeof name !== "string") {
    return res.status(400).json({ msg: "El campo 'name' debe ser una cadena de texto" });
  }

  // Validar IDs opcionales
  if (crop && !mongoose.Types.ObjectId.isValid(crop)) {
    return res.status(400).json({ msg: "El campo 'crop' debe ser un ID válido de MongoDB" });
  }

  if (cattle && !mongoose.Types.ObjectId.isValid(cattle)) {
    return res.status(400).json({ msg: "El campo 'cattle' debe ser un ID válido de MongoDB" });
  }

  next();
};

// Validación del parámetro ID para rutas con /:id
export const validateParcelId = (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      msg: "El parámetro 'id' es inválido o no tiene un formato válido de MongoDB",
    });
  }

  next();
};
