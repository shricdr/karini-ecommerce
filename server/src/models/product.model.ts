import mongoose, { Schema } from "mongoose";

export interface ProductDocument extends mongoose.Document {
  Handle: string;
  Title: string;
  Body: string;
  Vendor: string;
  Type: string;
  Tags: string[];
  Option1Name: string;
  Option1Value: string;
  Option2Name?: string; // Optional
  Option2Value?: string; // Optional
  Option3Name?: string; // Optional
  Option3Value?: string; // Optional
  VariantSKU: string;
  VariantGrams: number;
  VariantInventoryTracker: string;
  VariantInventoryQty: number;
  VariantInventoryPolicy: "deny" | "continue"; // Assuming these are the possible values
  VariantFulfillmentService: string;
  VariantPrice: number;
  VariantCompareAtPrice?: number; // Can be empty string, so making it optional number
  ImageSrc: string;
}

const ProductSchema: Schema<ProductDocument> = new Schema({
  Handle: { type: String, required: true },
  Title: { type: String, default: "" },
  Body: { type: String, default: "" },
  Vendor: { type: String, default: "" },
  Type: { type: String, default: "" },
  Tags: { type: [String], default: [] }, // Assuming tags are an array
  Option1Name: { type: String, default: "Title" },
  Option1Value: { type: String, default: "Size Free" },
  Option2Name: { type: String, default: "" },
  Option2Value: { type: String, default: "" },
  Option3Name: { type: String, default: "" },
  Option3Value: { type: String, default: "" },
  VariantSKU: { type: String },
  VariantGrams: { type: Number, default: 0 },
  VariantInventoryTracker: { type: String, default: "shopify" },
  VariantInventoryQty: { type: Number, default: 0 },
  VariantInventoryPolicy: {
    type: String,
    enum: ["deny", "continue", ""],
    default: "deny",
  },
  VariantFulfillmentService: { type: String, default: "manual" },
  VariantPrice: { type: Number, required: true, default: 0 },
  VariantCompareAtPrice: { type: Number }, // Allowing null or undefined
  ImageSrc: { type: String, default: "" },
});

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

ProductModel.collection.createIndex({ VariantSKU: 1, VariantPrice: 1 });

export default ProductModel;
