import { comparePasswords, hashPassword } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.JS";
import { User } from "../models/user.models.js";

export const register = async (req,res) => {
    const {username, email,password,profile} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                msg:"Email ya registrado",
            })
        };
        if(!password){
            return res.status(400).json({
                msg:"la contraseña es obligatoria",
            })
        };
        const hashed = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password:hashed,
            profile
        })
        await newUser.save()
        res.json({
            msg:"Usuario registrado",
            data: newUser,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error del servidor"
        })
    }    
};
export const login = async (req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                msg:"Nombre de usuario incorrecto",
            })
        };
        const isMatch = await comparePasswords(password, user.password);
        if(!isMatch){
             return res.status(400).json({
                msg:"Contraseña incorrecta",
            })
        };
        const token = signToken(user);

        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        res.json({
            msg:"usuario logueado",
            token,
            username: user.username,
            email:user.email,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error del servidor"
        });
    }
    
}