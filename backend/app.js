import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv'
import { routes } from './src/routes/index.js';

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api",routes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, async ()=> {
    await connectDB();
    console.log(`Servidor escuchando http://localhost:${PORT}`);

})
