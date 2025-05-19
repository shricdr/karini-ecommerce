import express, { NextFunction } from "express";
const router = express.Router();
import {
  addItemToCartController,
  clearCartController,
  getCartItemsController,
  removeItemFromCartController,
  updateCartItemQuantityController,
} from "../controllers/cart.controller";

router.post("/addItemToCart", addItemToCartController);
router.delete("/clearCart", clearCartController);
router.get("/getCartItems", getCartItemsController);
router.delete("/removeItemFromCart", removeItemFromCartController);
router.put("/updateCartItemQuantity", updateCartItemQuantityController);

export default router;
