import { Router } from "express";
import {
  createIncludes,
  getAllIncludes,
  getIncludesById,
  updateIncludes,
  deleteIncludes,
} from "../controllers/includes.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/",protect, createIncludes);
router.get("/", getAllIncludes);
router.get("/:id", getIncludesById);
router.put("/:id",protect, updateIncludes);
router.delete("/:id",protect, deleteIncludes);

export default router;
