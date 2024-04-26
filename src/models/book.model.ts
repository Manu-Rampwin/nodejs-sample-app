import mongoose from "mongoose";
import { IBook } from "../interfaces/book.interfaces";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publication_year: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
