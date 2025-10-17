
import { Router } from "express";
import { getParcels, createParcel } from "../controllers/parcel.controller.js";

const Parouter = Router();

Parouter.get("/", getParcels);
Parouter.post("/", createParcel);

export default Parouter;
