import { Router } from "express";
import { authroutes } from "./auth.routes.js";
import { cattleRoute } from "./cattle.route.js";

export const routes = Router();

routes.use("/",authroutes);
routes.use("/", cattleRoute);