import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { connectDB } from "../core/database/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Mongo schema
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model("Data", DataSchema);
