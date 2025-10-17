import { Router } from "express";
import { deleteUser } from "../controllers/user.controller.js";

export const Userroute = Router();

Userroute.delete("/user/:id", deleteUser);
