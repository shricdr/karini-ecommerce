import express from "express";
const router = express.Router();
import { createUserController } from "../controllers/user.controller"; // Adjust the path as needed

// Route to create a new user
router.post("/users", createUserController);

export default router;
