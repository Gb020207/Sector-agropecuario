import express from "express";
import {
  createParcel,
  getParcel,
  updateParcel,
  deleteParcel,
} from "../controllers/parcel.controller.js";
import {
  validateParcelData,
  validateParcelUpdate,
  validateParcelId,
} from "../middlewares/parcel.middleware.js";

const router = express.Router();

// Crear una nueva parcela
router.post("/", validateParcelData, createParcel);

// Obtener una parcela por ID
router.get("/:id", validateParcelId, getParcel);

// Actualizar una parcela
router.put("/:id", validateParcelId, validateParcelUpdate, updateParcel);

// Eliminar una parcela
router.delete("/:id", validateParcelId, deleteParcel);

export default router;
