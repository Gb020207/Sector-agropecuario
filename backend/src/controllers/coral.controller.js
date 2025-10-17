import { Coral } from "../models/coral.models.js";

export const createCoral = async (req,res) => {
    const {place,establishment} = req.body;
    try {
        if(!place || !establishment){
            return res.status(500).json({
                msg:"Todos los campos son requeridos"
            })
        }
    } catch (error) {
        
    }
    
}