import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  createdAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
