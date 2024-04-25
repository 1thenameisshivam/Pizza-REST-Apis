import mongoose from "mongoose";
import { MONGO_URL } from "../config/index.js";
const dbConnection = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });
    await mongoose.connect(MONGO_URL);
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default dbConnection;
