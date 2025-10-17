
import { model, Schema, Types } from "mongoose";

const Coralschema = new Schema({
    place:{
        type:String,
        enum:["Coral","Gallinero","Establo","Aprisco","Redil"],
        default:"Coral",
        require:true,
    },
    establishment:{
        type:Types.ObjectId,
        ref:'Establishment',
        require:true,
    },
    cattle:[{
        type:Types.ObjectId,
        ref:'Cattle',
        require:true,
    }],
})

export const Coral = model('Coral', Coralschema);