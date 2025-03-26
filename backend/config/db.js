import mongoose from "mongoose";
import constants from "../constants.js";

mongoose.set("strictQuery", true);

let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = 5000;

const connectDb = async () => {
  const { uri, name } = constants.database;
  const connectionString = uri.value;

  try {
    connectionAttempts++;
    console.log(
      `Connecting to MongoDB (attempt ${connectionAttempts}/${MAX_CONNECTION_ATTEMPTS})...`
    );

    const conn = await mongoose.connect(`${connectionString}/${name.value}`);

    console.log(
      `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
    );
    connectionAttempts = 0;

    setupConnectionHandlers(conn);

    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    if (connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
      console.log(`Retrying in ${RETRY_INTERVAL_MS / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
      return connectDb();
    } else {
      console.error(
        `Failed to connect to MongoDB after ${MAX_CONNECTION_ATTEMPTS} attempts`
      );
      process.exit(1);
    }
  }
};

const setupConnectionHandlers = (conn) => {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    if (mongoose.connection.readyState !== 1) {
      console.log("Attempting to reconnect to MongoDB...");
      setTimeout(() => {
        connectDb().catch(console.error);
      }, RETRY_INTERVAL_MS);
    }
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    if (process.env.NODE_ENV !== "test") {
      console.log("Attempting to reconnect to MongoDB...");
      setTimeout(() => {
        connectDb().catch(console.error);
      }, RETRY_INTERVAL_MS);
    }
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
  });

  process.on("SIGINT", async () => {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    } catch (err) {
      console.error("Error during MongoDB disconnection:", err);
      process.exit(1);
    }
  });
};

export default connectDb;
