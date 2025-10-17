import express from "express";
import {
  createEstablishment,
  getAllEstablishments,
  getEstablishmentById,
  updateEstablishment,
  deleteEstablishment,
} from "../controllers/establishment.controller.js";
import {
  validateEstablishmentData,
  validateEstablishmentUpdate,
  validateEstablishmentId,
} from "../middlewares/establishment.middleware.js";

const router = express.Router();

router.post("/", validateEstablishmentData, createEstablishment);
router.get("/", getAllEstablishments);
router.get("/:id", validateEstablishmentId, getEstablishmentById);
router.put("/:id", validateEstablishmentId, validateEstablishmentUpdate, updateEstablishment);
router.delete("/:id", validateEstablishmentId, deleteEstablishment);

export default router;
