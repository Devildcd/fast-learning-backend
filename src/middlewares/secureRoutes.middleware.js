import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET);

    next(); // Si el token es válido, continuar con la siguiente función o ruta
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export default protect;
