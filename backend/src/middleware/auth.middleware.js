import { verifyToken } from "../helpers/jwt.JS";

// * middleware para verificar si el usuario está autenticado
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "No autorizado" });
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token Invalido" });
  }
};
