import { Request, Response } from "express";
import UserModel from "../models/user.model"; // Adjust the path as needed

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ message: "Please provide username, email, and password." });
    }

    const existingUserByUsername = await UserModel.findOne({ username });
    if (existingUserByUsername) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const newUser = new UserModel({
      username,
      email,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", userId: savedUser._id });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};
