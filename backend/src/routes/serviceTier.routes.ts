import express from "express";
import {
  createServiceTier,
  getAllServiceTiers,
  getServiceTierById,
  updateServiceTier,
  deleteServiceTier,
} from "../controllers/serviceTier.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/",protect, createServiceTier);
router.get("/", getAllServiceTiers);
router.get("/:id", getServiceTierById);
router.put("/:id",protect, updateServiceTier);
router.delete("/:id",protect, deleteServiceTier);

export default router;
