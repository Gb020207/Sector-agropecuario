import { model, Schema } from "mongoose";

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

export const  User = model('User',Userschema) 
