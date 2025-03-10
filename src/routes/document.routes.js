import express from "express";
import protect from '../middlewares/secureRoutes.middleware.js';
import { upload } from "../middlewares/upload.middleware.js";
import { uploadDocument, getDocuments, getDocument, destroyDocument } from "../controllers/document.controller.js";

const router = express.Router();

router.get("/", protect,  getDocuments); 
router.get("/:id", getDocument); 
router.post("/", upload.single("file"), uploadDocument);
router.delete("/:id", destroyDocument);  

export default router;