import { model, Schema, Types } from "mongoose";

const EstablishmentSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    parcel:[{
        type:Types.ObjectId,
        require:false,
    }]
})