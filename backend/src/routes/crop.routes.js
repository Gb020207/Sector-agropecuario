
import { Router } from "express";
import { getCrops, createCrop } from "../controllers/crop.controller.js";

const Croprouter = Router();

Croprouter.get("/", getCrops);
Croprouter.post("/", createCrop);

export default Croprouter;
