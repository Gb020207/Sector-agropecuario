import express from "express";
import {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} from "../controllers/crop.controller.js";
import {
  validateCropData,
  validateCropUpdate,
  validateCropId,
} from "../middlewares/crop.middleware.js";

const router = express.Router();

// Obtener todos los cultivos
router.get("/", getAllCrops);

// Obtener un cultivo por ID
router.get("/:id", validateCropId, getCropById);

// Crear un nuevo cultivo
router.post("/", validateCropData, createCrop);

// Actualizar un cultivo existente
router.put("/:id", validateCropId, validateCropUpdate, updateCrop);

// Eliminar un cultivo
router.delete("/:id", validateCropId, deleteCrop);

export default router;
