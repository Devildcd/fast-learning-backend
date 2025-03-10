import User from "../models/userModel.js";
import fs from "fs";
import path from "path";

export const getAuthenticatedUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    // Filtrar solo los campos permitidos para evitar modificaciones indebidas
    const allowedFields = ["name", "email", "profileImage"];
    const filteredData = Object.keys(updateData)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    // Buscar y actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(userId, filteredData, {
      new: true,
      runValidators: true,
    }).select("-password -refreshToken");

    if (!updatedUser) throw new Error("User not found");

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};

export const updateProfileImage = async (userId, imagePath) => {
    try {
      if (!imagePath) throw new Error("Image path is required");
  
      // Buscar el usuario por su ID
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
  
      // Si el usuario ya tiene una imagen de perfil, la eliminamos del servidor
      if (user.profileImage) {
        const oldImagePath = path.join("uploads", "images", path.basename(user.profileImage));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Eliminar archivo antiguo
        }
      }
  
      // Si no hay imagen de perfil, no es necesario eliminar nada
      // Actualizamos la URL de la nueva imagen en la base de datos
      user.profileImage = imagePath;
      await user.save();
  
      // Devolver el usuario actualizado sin los campos sensibles
      return user;
    } catch (error) {
      throw new Error(`Error updating profile image: ${error.message}`);
    }
  };


