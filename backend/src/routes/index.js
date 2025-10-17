import { Router } from "express";
import { authroutes } from "./auth.routes.js";
import { Cattlerouter } from "./cattle.routes.js";
import Parouter from "./parcel.routes.js";
import Croprouter from "./crop.routes.js";

export const routes = Router();

routes.use("/",authroutes);
routes.use("/",Cattlerouter);

routes.use("/parcels", Parouter);
routes.use("/crops", Croprouter);