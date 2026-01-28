import express from "express";
import {
  createTransfer,
  getAllTransfers,
  getTransferById,
  updateTransfer,
  deleteTransfer,
} from "../controllers/transfer.controller";

const router = express.Router();

router.post("/", createTransfer);
router.get("/", getAllTransfers);
router.get("/:id", getTransferById);
router.put("/:id", updateTransfer);
router.delete("/:id", deleteTransfer);

export default router;
