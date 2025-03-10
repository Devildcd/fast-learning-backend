import express from "express";
import {
    getUser,
    editUser,
    uploadProfileImage,
} from "../controllers/user.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';
import { imageUpload } from "../middlewares/imageUploadMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUser);
router.post("/:id/profile-image", authMiddleware, imageUpload.single("image"), uploadProfileImage);
router.put("/:id", authMiddleware, editUser);

export default router;