import express from "express";
import { createAdmin, forgotPassword, getAdminById, getAllAdmins, updateAdmin, verifyOtpAndResetPassword } from "../controllers/admin.controller";
const router = express.Router();

router.post("/",createAdmin);
router.get("/",getAllAdmins);
router.get("/:id",getAdminById);
router.put("/:id",updateAdmin)
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtpAndResetPassword);


export default router;