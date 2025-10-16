import { model, Schema, Types } from "mongoose";


const Cattleschema = new Schema({
    spieces:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
        unique:true,
    },
    healt:{
        type:String,
        require:true,
    },
    temperature:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true,
    },
    farmer:{
        type: Types.ObjectId,
        ref:'User',
        require:true,
        unique:true,
    }
})

export const Cattle = model('Cattle', Cattleschema);