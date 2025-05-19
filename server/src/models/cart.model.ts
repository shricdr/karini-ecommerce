import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
  productId: Types.ObjectId;
  quantity: number;
}

const CartSchema: Schema<ICart> = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product", // Reference to your Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const Cart = mongoose.model<ICart>("Cart", CartSchema);
Cart.collection.createIndex({ productId: 1 });

export default Cart;
