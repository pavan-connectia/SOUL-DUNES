import express from "express";
import { forgotPassword, getAdminById, getAllAdmins, loginAdmin, signupAdmin, verifyOtpAndResetPassword } from "../controllers/admin.controller";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/signup", signupAdmin);
router.get("/login", loginAdmin);
router.get("/all",protect,getAllAdmins);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtpAndResetPassword);

router.get("/:id",protect, getAdminById);

export default router;