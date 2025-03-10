import Document from "../models/documentModel.js";
import { fileURLToPath } from "url";
import * as fs from "fs";
import path from "path";

/**
 * Obtener documentos con paginación y población de Technology
 */
export const getAllDocuments = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const documents = await Document.find()
            .populate("technology_id", "name")
            .skip(skip)
            .limit(limit);
        
        const total = await Document.countDocuments();
        return { 
            documents, 
            total, 
            page, 
            totalPages: Math.ceil(total / limit) 
        };
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw new Error("There was an issue retrieving documents.");
    }
};


/**
 * Crear un nuevo documento asociado a una tecnología
 */
export const createDocument = async ({ technology_id, title, fileName }) => {
    try {
        const document = await Document.create({
            technology_id,
            title,
            file_url: fileName  // Aquí guardamos solo el nombre del archivo
        });
        return document;
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("There was an issue creating the document.");
    }
};


export const getDocumentById = async (id) => {
    try {
        const document = await Document.findById(id).populate("technology_id", "name");
        if (!document) {
            throw new Error("Document not found");
        }
        return document;
    } catch (error) {
        console.error("Error fetching document by ID:", error);
        throw new Error("There was an issue retrieving the document.");
    }
};


// Obtener __dirname de forma segura para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCUMENTS_PATH = path.join(__dirname, "../../uploads/documents");// Construir la ruta base de forma correcta

export const deleteDocument = async (id) => {
    try {
      const document = await Document.findById(id);
      if (!document) {
        throw new Error("Document not found");
      }
  
      let fileName = document.file_url;
      if (!fileName) {
        throw new Error("Document has no file_url");
      }
  
      // Eliminar cualquier slash inicial del nombre del archivo
      fileName = fileName.replace(/^[/\\]+/, '');
  
      // Concatenar la ruta correctamente
      const filePath = path.resolve(DOCUMENTS_PATH, fileName);
  
      console.log(`📁 DOCUMENTS_PATH: ${DOCUMENTS_PATH}`);
      console.log(`📄 fileName: ${fileName}`);
      console.log(`📄 filePath: ${filePath}`);
  
      // Verifica si el archivo existe antes de eliminarlo
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath); // Eliminar el archivo de forma asíncrona
        console.log(`✅ Archivo eliminado: ${filePath}`);
      } else {
        console.warn(`⚠️ Archivo no encontrado en: ${filePath}`);
        // Verificar si el archivo existe en otro lugar
        const filesInDirectory = fs.readdirSync(DOCUMENTS_PATH);
        console.log(`📂 Archivos en el directorio: ${filesInDirectory.join(', ')}`);
      }
  
      // Elimina el documento de la base de datos
      await Document.findByIdAndDelete(id);
      console.log(`✅ Documento eliminado de la base de datos`);
  
      return { message: "Document deleted successfully" };
    } catch (error) {
      console.error("❌ Error deleting document:", error.message);
      throw new Error("Error deleting document");
    }
  };