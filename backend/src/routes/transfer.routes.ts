import express from "express";
import {
  createTransfer,
  getAllTransfers,
  getTransferById,
  updateTransfer,
  deleteTransfer,
} from "../controllers/transfer.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/",protect, createTransfer);
router.get("/", getAllTransfers);
router.get("/:id", getTransferById);
router.put("/:id",protect, updateTransfer);
router.delete("/:id",protect, deleteTransfer);

export default router;
