import { model, Schema, Types } from "mongoose";

const Cropschema = new Schema({
    name:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
        enum:["good","engaged","bad"],
        default: "good",
    },
    amount:{
        type:Number,
        require:true,
    },
    farmer:{
        type:Types.ObjectId,
        ref:'User',
        require:true,

    },
    

})

export const Crop = model('Crop',Cropschema);