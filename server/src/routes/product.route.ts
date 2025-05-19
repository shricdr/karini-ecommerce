import express from "express";
const router = express.Router();

import {
  chatsController,
  dbSearchController,
  getAllProductsController,
  uploadProductsController,
} from "../controllers/products.controller"; // Adjust the path as needed
import { getProductsInPagination } from "../services/products.service";

router.post("/uploadProducts", uploadProductsController);
router.get("/getAllProducts", getAllProductsController);
router.get("/getProducts", getProductsInPagination);
router.get("/search", dbSearchController);
router.post("/chat", chatsController);

export default router;
