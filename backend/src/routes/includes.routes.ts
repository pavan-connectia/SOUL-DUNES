import { Router } from "express";
import {
  createIncludes,
  getAllIncludes,
  getIncludesById,
  updateIncludes,
  deleteIncludes,
} from "../controllers/includes.controller";

const router = Router();

router.post("/", createIncludes);
router.get("/", getAllIncludes);
router.get("/:id", getIncludesById);
router.put("/:id", updateIncludes);
router.delete("/:id", deleteIncludes);

export default router;
