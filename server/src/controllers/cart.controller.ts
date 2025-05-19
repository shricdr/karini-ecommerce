import { Request, Response } from "express";
import {
  addItemToCart,
  clearCart,
  getCartItems,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../services/cart.service";

export const getCartItemsController = async (req: Request, res: Response) => {
  try {
    await getCartItems(req, res);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};

export const addItemToCartController = async (req: Request, res: Response) => {
  try {
    await addItemToCart(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const updateCartItemQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    await updateCartItemQuantity(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
export const removeItemFromCartController = async (
  req: Request,
  res: Response
) => {
  try {
    await removeItemFromCart(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const clearCartController = async (req: Request, res: Response) => {
  try {
    await clearCart(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
