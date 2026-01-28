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

const router = express.Router();

router.post("/groups", createProductGroup);
router.get("/groups", getAllProductGroups);
router.get("/groups/:id", getProductGroupById);
router.put("/groups/:id", updateProductGroup);
router.delete("/groups/:id", deleteProductGroup);

router.post("/types", createProductType);
router.get("/types", getAllProductTypes);
router.get("/types/:id", getProductTypeById);
router.put("/types/:id", updateProductType);
router.delete("/types/:id", deleteProductType);

export default router;
