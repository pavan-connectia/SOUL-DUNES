import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/",protect, createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id",protect, updateService);
router.delete("/:id",protect, deleteService);

export default router;
