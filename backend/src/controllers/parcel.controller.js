import { Parcel } from "../models/parcel.models.js";

export const createParcel = async (req,res) => {
    const {name,farmer,crop,cattle} = req.body;
    try {
        if(name === "" || name === undefined || farmer === "" || farmer === undefined || crop === "" || crop === undefined || cattle === "" || cattle === undefined){
            return res.status(400).json({
                msg:"Todos los campos son requeridos",
            })
        };
        const parcel = await Parcel.create({farmer,crop,cattle});
        return res.status(200).json({
            msg:"Parcela creada",
            data:parcel,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }
    
}
export const getParcel = async (req,res) => {
    const {id} = req.params;
    try{
        const parcel = await Parcel.findById(id).populate('farmer')
        return res.status(201).json(
            {
                data:parcel,
            }
        )
    }catch (error){
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }
    
};
export const updateParcel = async (req,res) => {
    const {id} = req.params;
    const {name,crop,cattle} = req.body;
    try {
         if(!id){
            msg:"el id es invalido coloque un id valido"
        }
        const parcel = await Parcel.findByIdAndUpdate(id,
            {name,crop,cattle},
            {new:true}
        )
        return res.status(201).json({
            msg:"Parcela actualizada",
            data:parcel,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }
    
};

