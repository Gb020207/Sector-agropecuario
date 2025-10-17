import { Router } from "express";
import {
  createCattle,
  getCattle,
  getOneCattle,
  updateCattle,
  deleteCattle,
} from "../controllers/cattle.controller.js";
import { validateCattleData ,validateCattleId} from "../middleware/cattle.middleware.js";
export const Cattlerouter = Router();

// Crear nuevo ganado
Cattlerouter.post("/cattle", validateCattleData, createCattle);

// Obtener todos
Cattlerouter.get("/cattle", getCattle);

// Obtener uno por ID
Cattlerouter.get("/cattle/:id", validateCattleId, getOneCattle);

// Actualizar (solo temperatura, ubicación, salud)
Cattlerouter.put("/cattle/:id", validateCattleId, updateCattle);

// Eliminar
Cattlerouter.delete("/cattle/:id", validateCattleId, deleteCattle);

export default Cattlerouter;
