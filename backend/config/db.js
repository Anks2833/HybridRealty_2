import mongoose from "mongoose";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const { dbName, mongoUri } = config;

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(`${mongoUri}/${dbName}`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectdb;
