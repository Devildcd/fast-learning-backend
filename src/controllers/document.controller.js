import asyncHandler from "express-async-handler";
import { createDocument, getAllDocuments, getDocumentById, deleteDocument } from "../services/document.service.js";

export const getDocuments = asyncHandler( async(req, res) => {
    const {page = 1, limit = 10} = req.query;
    const result = await getAllDocuments(Number(page), Number(limit));
    res.json(result);
}) ;

export const getDocument = asyncHandler( async(req, res) => {
    const document = await getDocumentById(req.params.id);
    if(!document) {
        res.status(404);
        throw new Error("Document not found");
    }

    res.json(document);
});

export const uploadDocument = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("File is required");
    }

    const { technology_id, title } = req.body;

    if (!technology_id || !title) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Solo almacenar el nombre del archivo en la base de datos
    const fileName = req.file.filename;  // El nombre del archivo que Multer genera
    const newDocument = await createDocument({ technology_id, title, fileName });

    res.status(201).json(newDocument);
});


export const destroyDocument = asyncHandler( async(req, res) => {
    const document = await deleteDocument(req.params.id);
    if(!document) {
        res.status(404);
        throw new Error("Document not found");
    }

    res.json({ message: "Document deleted successfully" });
})