import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./core/database/database";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.raw({ type: "*/*", limit: "50mb" }));
// app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "ping pong" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
