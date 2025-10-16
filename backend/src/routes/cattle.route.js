import { Router } from "express";
import { createCattle, getCattle, getOneCattle } from "../controllers/cattle.controller.js";

export const cattleRoute = Router();

cattleRoute.post("/cattle", createCattle);
cattleRoute.get("/cattle", getCattle);
cattleRoute.get("/cattle/:id", getOneCattle);