import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["Admin", "User"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 255,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // No devolver la contraseña en las consultas
      minlength: [8, "Password must be at least 8 characters long"],
    },
    refreshToken: { type: String }, // Almacenar Refresh Token
    profileImage: {
      type: String, // URL de la imagen (puede ser de almacenamiento local o en la nube)
      default: null,
    },
  },
  {timestamps: true} // Agrega campos `createdAt` y `updatedAt` automáticamente
);

// 🔹 Agregar método para comparar contraseñas
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Crear el modelo
const User = mongoose.model("User", userSchema);
export default User;