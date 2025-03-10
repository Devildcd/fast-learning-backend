import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { config } from "../config/env.js";
import bcrypt from "bcrypt";

// Generar Access Token (15 minutos)
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, config.jwtSecretKey, {
    expiresIn: "15m",
  });
};

// Generar Refresh Token (7 días)
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, config.jwtRefreshKey, {
      expiresIn: "7d",
    });
  };

// Guardar el Refresh Token en la cookie segura
const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
}

// Crear usuario
export const registerUser = async (name, email, password, passwordConfirmed, role) => {
  try {
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("User already exists");

      if (password !== passwordConfirmed) throw new Error("Passwords do not match");

      // Validar la contraseña antes de hashearla
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
          throw new Error(
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
      }

      // Hashear la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, password: hashedPassword, role });
      return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};


// Servicio de Login con Refresh Token
export const loginUser = async (email, password, res) => {
  try {
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
          throw new Error("Invalid credentials");
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Guardar el refresh token en la BD
      user.refreshToken = refreshToken;
      await user.save();

      // Guardar el refresh token en una cookie segura
      setRefreshTokenCookie(res, refreshToken);

      return accessToken;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};


// Servicio para refrescar Access Token
export const refreshAccessToken = async (refreshToken) => {
  try {
      if (!refreshToken) throw new Error("No refresh token provided");

      const decoded = jwt.verify(refreshToken, config.jwtRefreshKey);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
          throw new Error("Invalid refresh token");
      }

      return generateAccessToken(user);
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};


// Logout
export const logoutUser = async (res, user) => {
  try {
      if (user) {
          user.refreshToken = null;
          await user.save();
      }
      res.clearCookie("refreshToken");
      res.clearCookie("jwt");
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message);
  }
};
