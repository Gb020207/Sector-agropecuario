import { Cattle } from "../models/cattle.models.js";

export const createCattle = async (req,res) => {
    const {spieces,name,healt,temperature,location,farmer} = req.body;
    try {
        if(spieces === "" || spieces === undefined,name === "" || name === undefined,healt === "" || healt === undefined,temperature === "" || temperature === undefined,location === "" || location === undefined,farmer === "" || farmer === undefined){
            return res.status(400).json({
                msg:"Todos los campos son requeridos",
            })
        }
        const cattle = await Cattle.create({spieces,name,healt,temperature,location,farmer})

        return res.status(200).json({
            msg:"Ganado añadido",
            data:cattle,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor",
        })
    }
    
};
export const getCattle = async (req,res) => {
    try {
        const cattles = await Cattle.find().populate('farmer');
        return res.json({
            data:cattles
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Error del servidor",
        })
    }
    
}
export const getOneCattle = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            msg:"el id es invalido coloque un id valido"
        }
        const cattle = await Cattle.findById(id).populate('farmer');
        return res.status(200).json({
            data:cattle,
        })
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            msg:"Error del servidor",
        })
    }
    
};
export const updateCattle = async (req,res) => {
    const {temperature,location,healt} = req.body;
    const {id} = req.params;
    try {
       if(!id){
            msg:"el id es invalido coloque un id valido"
        }
        const cattle = await Cattle.findByIdAndUpdate({temperature,location,healt});
        return res.status(201).json({
            msg:"Ganado actualizado correctamente",
            data:cattle,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error del servidor",
        })
    };
    
    
}