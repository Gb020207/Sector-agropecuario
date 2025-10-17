import { model, Schema, Types } from "mongoose";

const Cropschema = new Schema({
    name:{
        type:String,
        require:true,
    },
    cycle:{
        type:String,
      },
    season:{
       type:String,
    },
    parcelId:{
        type:Types.ObjectId,
        ref:'Parcel'
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
    
})

export const Crop = model("Crop",Cropschema);