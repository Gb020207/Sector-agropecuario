import { model, Schema } from "mongoose";
import { Parcel } from "./parcel.models.js";
import { Crop } from "./crop.model.js";
import { Cattle } from "./cattle.models.js";

const Userschema = new Schema({
    username:{
        type: String,
        unique:true,
        require:true,
    },
    email:{
        type: String,
        unique:true,
        require:true,

    },
    password:{
        type:String,
        require:true,

    },
    profile:{
        firstName:{
            type:String,
            require:true,
        },
        lastName:{
            type:String,
            require:true,
        }
    }
});
Userschema.pre("findOneAndDelete", async function (next) {
    const userId = this.getQuery()._id;

    console.log("Usuario eliminado",userId)
    const parcels = await Parcel.find({ userId: userId });
    for (const parcel of parcels) {
        await Parcel.findOneAndDelete({ _id: parcel._id }); 
    }
    await Crop.deleteMany({userId:userId});
    await Cattle.deleteMany({userId:userId})

    next();
})
export const  User = model('User',Userschema) 
