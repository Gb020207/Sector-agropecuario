import { User } from "../models/user.models.js";

export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(404).json({
                msg:"el id es invalido coloque un id valido"
            })
        };
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({
            msg:"Usuario eliminado",
            data:user,
        })
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            msg:"Error interno del servidor",
            
        })
        
    }
    
}