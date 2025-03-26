import app from "./app.js";
import connectDb from "./config/db.js";
import constants from "./constants.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define port from constants or environment
const port = constants.server.port.value || 8000;

const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`
          HybridRealty API Server
          Running on port: ${port}
          Environment: 
          ${new Date().toISOString()} 
        `);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Handle SIGTERM signal (sent by hosting platforms like Heroku during shutdown)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

startServer();
