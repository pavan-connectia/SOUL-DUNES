import express from "express";
import {
  createServiceTier,
  getAllServiceTiers,
  getServiceTierById,
  updateServiceTier,
  deleteServiceTier,
} from "../controllers/serviceTier.controller";

const router = express.Router();

router.post("/", createServiceTier);
router.get("/", getAllServiceTiers);
router.get("/:id", getServiceTierById);
router.put("/:id", updateServiceTier);
router.delete("/:id", deleteServiceTier);

export default router;
