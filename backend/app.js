import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import { trackAPIStats } from "./middleware/statsMiddleware.js";
// import propertyrouter from "./routes/ProductRouter.js";
// import userrouter from "./routes/UserRoute.js";
// import formrouter from "./routes/formrouter.js";
// import newsrouter from "./routes/newsRoute.js";
// import appointmentRouter from "./routes/appointmentRoute.js";
// import adminRouter from "./routes/adminRoute.js";
// import propertyRoutes from "./routes/propertyRoutes.js";
import constants from "./constants.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(constants.server.apiRateLimit.value) || 500,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Security middlewares
app.use(limiter);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(compression());

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API statistics tracking
app.use(trackAPIStats);

// CORS Configuration
const allowedOrigins = constants.server.corsOrigin.value.includes(",")
  ? constants.server.corsOrigin.value.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "https://buildestate.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// ==== API ROUTES ====
// app.use("/api/products", propertyrouter);
// app.use("/api/users", userrouter);
// app.use("/api/forms", formrouter);
// app.use("/api/news", newsrouter);
// app.use("/api/appointments", appointmentRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api", propertyRoutes);

// ==== STATUS ENDPOINTS ====

// Status check endpoint (JSON)
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "OK",
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Root endpoint - Using EJS template
app.get("/", (req, res) => {
  res.render("pages/status", {
    title: "BuildEstate API Status",
    appName: "BuildEstate",
    status: "Online",
    serverTime: new Date().toLocaleString(),
    environment: process.env.NODE_ENV || "development",
    currentYear: new Date().getFullYear(),
  });
});

// ==== ERROR HANDLING ====

// 404 handler - for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    statusCode: 404,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

export default app;
