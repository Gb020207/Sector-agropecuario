import { Router } from 'express';
import { getClima } from '../controllers/clima.controller.js';
export const Climarouter = Router();

// Define la ruta GET /api/clima, que usa la función getClima del controlador
Climarouter.get('/clima', getClima);

