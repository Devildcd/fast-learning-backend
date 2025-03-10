import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Ruta donde se guardarán los archivos
const uploadPath = path.join("uploads", "documents");

// Crear la carpeta si no existe
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("📂 Carpeta creada:", uploadPath);
} else {
    console.log("✅ Carpeta existente:", uploadPath);
}

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/documents/"); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => { // Aquí corregimos `file`
        const ext = path.extname(file.originalname); // Obtener extensión del archivo
        const filename = `${uuidv4()}${ext}`; // Generar un nombre único
        cb(null, filename);
    }
});

// Filtro para aceptar solo archivos PDF o DOCX
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX files are allowed"), false);
    }
};

// Middleware de `multer`
export const upload = multer({ storage, fileFilter });
