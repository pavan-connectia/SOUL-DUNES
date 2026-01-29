import { Router } from "express";
import {
  createComparative,
  getAllComparatives,
  getComparativeById,
  updateComparative,
  deleteComparative,
} from "../controllers/comparative.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/",protect, createComparative);
router.get("/", getAllComparatives);
router.get("/:id", getComparativeById);
router.put("/:id",protect, updateComparative);
router.delete("/:id",protect, deleteComparative);

export default router;
