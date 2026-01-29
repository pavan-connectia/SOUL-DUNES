import express from "express";
import {
  createImportant,
  getAllImportant,
  getImportantById,
  updateImportant,
  deleteImportant,
} from "../controllers/important.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/",protect, createImportant);
router.get("/", getAllImportant);
router.get("/:id", getImportantById);
router.put("/:id",protect, updateImportant);
router.delete("/:id",protect, deleteImportant);

export default router;
