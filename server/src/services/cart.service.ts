import { Request, Response } from "express";

import Cart from "../models/cart.model";
export const convertToJson = (req: Request) => {
  const dataBuffer = req.body;
  const dataAsString: string = dataBuffer.toString("utf-8");
  console.log("dataAsString", dataAsString);
  const data: any = JSON.parse(dataAsString);
  console.log("Data as JSON:", data);
  console.log("typeof data", typeof data);
  console.log("data", data);
  return data;
};
export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItems: any = await Cart.find({}).populate("productId");
    let totalAmount = 0;
    for (const item of cartItems) {
      if (
        item.productId &&
        typeof item.productId === "object" &&
        "VariantPrice" in item.productId
      ) {
        totalAmount += item.productId.VariantPrice * item.quantity;
      }
    }

    res.status(200).json({
      message: "Cart items retrieved successfully",
      data: cartItems,
      totalAmount: Math.round(totalAmount),
    });
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ message: "Error getting cart items." });
  }
};
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const data = convertToJson(req);
    const { productId, quantity } = data;
    const existingCartItem = await Cart.findOne({ productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.status(200).json({
        message: "Item added to cart successfully",
        data: existingCartItem,
      });
    } else {
      const newCartItem = new Cart({ productId, quantity });
      const savedCartItem = await newCartItem.save();
      res.status(200).json({
        message: "Item added to cart successfully",
        data: savedCartItem,
      });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const data = convertToJson(req);
    const { productId, quantity } = data;
    await Cart.findOneAndUpdate(
      { productId },
      { quantity: Math.max(1, quantity) },
      { new: true }
    );
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ message: "Error updating cart item quantity." });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const data = convertToJson(req);
    const { productId } = data;
    const deletedCartItem = await Cart.findOneAndDelete({
      productId,
    });
    res.status(200).json({
      message: "Item added to cart successfully",
      data: deletedCartItem,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart." });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await Cart.deleteMany();
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart." });
  }
};
