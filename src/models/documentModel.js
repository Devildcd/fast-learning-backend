import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    technology_id: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Subject
      ref: 'Technology', // Nombre del modelo referenciado
      required: [true, 'Technology ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    file_url: {
      type: String,
      required: [true, 'File URL is required'],
    }
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;