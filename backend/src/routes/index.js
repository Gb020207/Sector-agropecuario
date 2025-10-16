import { Router } from "express";
import { authroutes } from "./auth.routes.js";

export const routes = Router();

routes.use("/",authroutes)