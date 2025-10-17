import { model, Schema, Types } from "mongoose";
import { Crop } from "./crop.model.js";
import { Cattle } from "./cattle.models.js";

const Parcelschema = new Schema({
    establishment:{
        type:Types.ObjectId,
        ref:'Establishment',
        require:true,
    },
    crop:[{
        type:Types.ObjectId,
        ref:'Crop',
        require:true,
    }],
    cattle:[{
        type:Types.ObjectId,
        ref:'Cattle',
        require:false,
    }]
})
Parcelschema.pre('findOneAndDelete',async function(next) {
    const parcelId = this.getQuery()._id;

    const parcel = await Parcel.findById(parcelId)

    await Crop.deleteMany({_id:parcel.crop})  
    await Cattle.deleteMany({_id:parcel.cattle})  

    next();
})

export const Parcel = model('Parcel', Parcelschema);