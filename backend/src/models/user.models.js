import { model, Schema } from "mongoose";

const Userschema = new Schema({
    username:{
        type: String,
        unique:true,
        required:true,
    },
    email:{
        type: String,
        unique:true,
        required:true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Formato de correo inválido.']
    },
    password:{
        type:String,
        required:true,
        minLength: [6, 'La contraseña debe tener al menos 6 caracteres.']
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

export const  User = model("User",Userschema) 
