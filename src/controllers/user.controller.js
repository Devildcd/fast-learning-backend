import asyncHandler from "express-async-handler";
import { getAuthenticatedUser, updateUser, updateProfileImage } from "../services/user.service.js";

// Obtener usuario autenticado
export const getUser = asyncHandler(async (req, res) => {
    const user = await getAuthenticatedUser(req.user.id);
    res.json(user);
});

// Actualizar perfil del usuario autenticado
export const editUser = asyncHandler(async (req, res) => {
    const updatedUser = await updateUser(req.user.id, req.body);
    res.json(updatedUser);
});

// Subir la imagen del perfil
export const uploadProfileImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("Image file is required");
    }

    const userId = req.user.id; // Obtenemos el ID del usuario autenticado
    const imagePath = `/uploads/images/${req.file.filename}`; // Ruta relativa de la imagen

    const updatedUser = await updateProfileImage(userId, imagePath);

    res.json({ message: "Profile image updated successfully", user: updatedUser });
});