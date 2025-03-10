import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
      minlength: [3, "The name must be at least 3 characters"],
      maxlength: [50, "The name cannot exceed 50 characters"],
    },
    type: {
      type: String,
      required: [true, "The type is required"],
      enum: {
        values: ["Framework", "Language", "Platform", "Tool", "Package"],
        message: "{VALUE} is not a valid type",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true, // Crea `createdAt` y `updatedAt`
  }
);

const Technology = mongoose.model("Technology", technologySchema);
export default Technology;
