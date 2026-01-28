import { Router } from "express";
import {
  createComparative,
  getAllComparatives,
  getComparativeById,
  updateComparative,
  deleteComparative,
} from "../controllers/comparative.controller";

const router = Router();

router.post("/", createComparative);
router.get("/", getAllComparatives);
router.get("/:id", getComparativeById);
router.put("/:id", updateComparative);
router.delete("/:id", deleteComparative);

export default router;
