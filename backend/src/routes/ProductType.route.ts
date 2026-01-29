import express from "express";

import {
     createProductGroup,
  getAllProductGroups,
  getProductGroupById,
  updateProductGroup,
  deleteProductGroup,
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType
} from "../controllers/ProductType.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/groups",protect, createProductGroup);
router.get("/groups", getAllProductGroups);
router.get("/groups/:id", getProductGroupById);
router.put("/groups/:id",protect, updateProductGroup);
router.delete("/groups/:id",protect, deleteProductGroup);

router.post("/types",protect, createProductType);
router.get("/types", getAllProductTypes);
router.get("/types/:id", getProductTypeById);
router.put("/types/:id",protect, updateProductType);
router.delete("/types/:id",protect, deleteProductType);

export default router;
