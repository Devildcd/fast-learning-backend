import mongoose from "mongoose";

const linkSchema = mongoose.Schema(
  {
    technology_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technology",
      required: [true, "Technology ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    url: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 2048,
      match: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, // Validación con regex
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch (e) {
            return false;
          }
        },
        message: (props) => `${props.value} not a valid Url`,
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    is_official: {
      type: Boolean,
      required: true, // El campo es obligatorio
      default: false, // Valor por defecto si no se proporciona
    },
  },
  {
    timestamps: true, // Agrega campos `createdAt` y `updatedAt` automáticamente
  }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
