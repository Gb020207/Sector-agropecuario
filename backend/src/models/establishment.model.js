import { model, Schema, Types } from "mongoose";

const EstablishmentSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    area:{
        type:Number,
        require:true,
    },
    parcel:[{
        type:Types.ObjectId,
        require:false,
    }]
})

export const Establishment = model("Establishment",EstablishmentSchema);