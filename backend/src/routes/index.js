import { Router } from "express";
import { authroutes } from "./auth.routes.js";
import { chatWithModel } from "../controllers/chat.controllers.js";

export const routes = Router();

routes.use("/",authroutes)
routes.post("/chat", obtenerRespuesta);