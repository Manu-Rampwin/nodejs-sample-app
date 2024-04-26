  import mongoose from "mongoose";
  import { IUser } from "../interfaces/auth.interfaces";

  const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );

  export default mongoose.model<IUser>("User", UserSchema);
