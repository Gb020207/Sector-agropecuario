import { Router } from "express";
import { authroutes } from "./auth.routes.js";
import { Climarouter } from "./clima.routes.js";
import { Cattlerouter } from "./cattle.routes.js";

export const routes = Router();

routes.use("/",authroutes);
routes.use("/",Cattlerouter);
routes.use("/", Climarouter);