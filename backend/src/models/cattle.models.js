import { model, Schema } from "mongoose";

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
        ref:"User",
        require:true,
        unique:true,
    }
})