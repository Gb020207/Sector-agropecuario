import { Crop } from "../models/crop.model.js"

export const getAllCrops = async(req, res)=>{
    try {
        const crop = await Crop.find().populate('farmer')
        return res.status(201).json(
            {
                data:crop,
            }
        )
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor",
        })
    }
}

export const getCropById = async (req,res) => {
    const {id} = req.params;
    try {
         if(!id){
            return res.status(400).json({msg:"el id es invalido coloque un id valido"})
        }
        const crop = await Crop.findById(id).populate('farmer');
        return res.status(200).json({
            data:crop,
        })
    } catch (error) {
        console.log(error)
         return res.status(500).json({
            msg:"Error del servidor",
        })
    }
    
};

export const createCrop = async(req, res)=>{
    const {name, state, amount, farmer} = req.body
    try {
        if(name === "" || name === undefined || state === "" || state === undefined || farmer === "" || farmer === undefined){
            return res.status(400).json({
                msg:"Todos los campos son requeridos",
            })
        };
        const crop = await Crop.create({name,state,amount,farmer});
        return res.status(200).json({
            msg:"Cultivo creado",
            data:crop,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }
}

export const updateCrop = async (req,res) => {
    const {id} = req.params;
    const {name,state,amount,farmer} = req.body;
    try {
         if(!id){
            return res.status(400).json({msg:"el id es invalido coloque un id valido"})
        }
        const crop = await Crop.findByIdAndUpdate(id,
            {name,state,amount,farmer},
            {new:true}
        )
        return res.status(201).json({
            msg:"Cultivo actualizado",
            data:crop,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }
    
};

export const deleteCrop = async (req, res)=>{
    const {id} = req.params;
    try {
         if(!id){
            return res.status(400).json({msg:"el id es invalido coloque un id valido"})
        }
        const crop = await Crop.findByIdAndDelete(id);
        return res.status(204).json({ msg: "Cultivo eliminado correctamente",data:crop });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};
