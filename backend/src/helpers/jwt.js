import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = 
(token) => jwt.verify(token, process.env.JWT_SECRET);


export const signToken = (user) => {
    console.log("Usuario recibido en sigToken", user)
    if(!user || !user._id){
        throw new Error("El usuario no tiene un _id valido")
    }
    console.log(process.env.JWT_SECRET)
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }
    return jwt.sign(
        { id: user._id.toString(), 
            email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};