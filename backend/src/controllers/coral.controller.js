import { Coral } from "../models/coral.models.js";

export const createCoral = async (req,res) => {
    const {place,establishment} = req.body;
    try {
        if(!place || !establishment){
            return res.status(500).json({
                msg:"Todos los campos son requeridos"
            })
        }
        const coral = await Coral.create({place, establishment})

        return res.status(200).json({
            msg:"Lugar creado",
            data:coral,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error del servidor",
        })
    }
    
};
export const getCoral = async (req,res) => {
    const {id} = req.params;
    try {
       if(!id){
            return res.status(400).json({msg:"el id es invalido coloque un id valido"})
        }
        const coral = await Coral.findById(id).populate('establishment').populate('cattle')
        res.status(201).json({
            msg:"Ganado",
            data:coral,
        })
    } catch (error) {
        
    }
}