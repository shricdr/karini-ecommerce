import { Request, Response } from "express";
import {
  bulkInsertProduct,
  Chats,
  dbSearch,
  getAllProducts,
  getProductsInPagination,
} from "../services/products.service";

export const uploadProductsController = async (req: Request, res: Response) => {
  try {
    await bulkInsertProduct(req, res);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    await getAllProducts(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const getProductsInPaginationController = async (
  req: Request,
  res: Response
) => {
  try {
    await getProductsInPagination(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const dbSearchController = async (req: Request, res: Response) => {
  try {
    await dbSearch(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

export const chatsController = async (req: Request, res: Response) => {
  try {
    await Chats(req, res);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
