import express from "express";
import { createOrder, getOrderDetails, updatePaymentStatus } from "../controllers/order.controller";
const router = express.Router();

router.post("/checkout", createOrder);
router.post("/payment/verify", updatePaymentStatus);
router.get("/:id", getOrderDetails);

export default router;