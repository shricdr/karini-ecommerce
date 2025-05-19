import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    await createUser(req, res);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};
