import { Router } from "express";

import { login, logout, register } from "../controllers/auth.controller.js";

export const authroutes = Router();

authroutes.post("/register",register)
authroutes.post("/login",login)
authroutes.post("/logout", logout)