import express from "express";
import {
  getTechnologies,
  getTechnology,
  storeTechnology,
  editTechnology,
  destroyTechnology,
} from "../controllers/technology.controller.js";

const router = express.Router();

router.get("/", getTechnologies);
router.get("/:id", getTechnology);
router.post("/", storeTechnology);
router.put("/:id", editTechnology);
router.delete("/:id", destroyTechnology);

export default router;