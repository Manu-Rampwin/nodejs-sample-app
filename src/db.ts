import mongoose from "mongoose";
import constants from "./config/constants";

export async function connectDb() {
  mongoose.set("strictQuery", true);
  return new Promise((resolve, reject) => {
    mongoose
      .connect(constants.DATABASE_URL)
      .then(() => {
        // console.log("mongo connection string", constants.DATABASE_URL);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
}
