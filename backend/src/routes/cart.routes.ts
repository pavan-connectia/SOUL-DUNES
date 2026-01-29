import express from "express";
import { addToCart, deleteCartItem, getCart,} from "../controllers/cart.controller";
const router = express.Router();

router.post("/add", addToCart); 
router.delete("/:cartId/item/:itemId", deleteCartItem); 
router.get("/:id", getCart); 

export default router;