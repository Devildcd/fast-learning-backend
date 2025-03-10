import express from "express";
import {
  getLinks,
  getLink,
  storeLink,
  editLink,
  destroyLink,
} from "../controllers/link.controller.js";

const router = express.Router();

router.get("/", getLinks);
router.get("/:id", getLink);
router.post("/", storeLink);
router.put("/:id", editLink);
router.delete("/:id", destroyLink);

export default router;