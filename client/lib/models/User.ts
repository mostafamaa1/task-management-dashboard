// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [3, "fullname must be at least 3 characters"],
    maxLength: [25, "fullname must be at most 25 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
