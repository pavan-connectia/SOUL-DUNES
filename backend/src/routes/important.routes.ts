import express from "express";
import {
  createImportant,
  getAllImportant,
  getImportantById,
  updateImportant,
  deleteImportant,
} from "../controllers/important.controller";

const router = express.Router();

router.post("/", createImportant);
router.get("/", getAllImportant);
router.get("/:id", getImportantById);
router.put("/:id", updateImportant);
router.delete("/:id", deleteImportant);

export default router;
