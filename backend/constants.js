import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const requireEnv = (key, defaultValue = undefined) => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    console.warn(`Required environment variable ${key} is missing`);
  }
  return value || defaultValue;
};

const constants = {
  server: {
    port: {
      id: 1,
      title: "PORT",
      description: "Server port number",
      value: process.env.PORT || 8000,
    },
    nodeEnv: {
      id: 6,
      title: "NODE_ENV",
      description: "Node environment (development/production/test)",
      value: process.env.NODE_ENV || "development",
    },
    corsOrigin: {
      id: 15,
      title: "CORS_ORIGIN",
      description: "Allowed origins for CORS (comma-separated)",
      value: process.env.CORS_ORIGIN || "*",
    },
    apiRateLimit: {
      id: 16,
      title: "API_RATE_LIMIT",
      description: "API rate limit per minute",
      value: parseInt(process.env.API_RATE_LIMIT || "100", 10),
    },
    frontendUrl: {
      id: 19,
      title: "FRONTEND_URL",
      description: "URL of the frontend application",
      value: process.env.FRONTEND_URL || "http://localhost:5173",
    },
    maxFileSize: {
      id: 17,
      title: "MAX_FILE_SIZE",
      description: "Maximum file size for uploads in MB",
      value: parseInt(process.env.MAX_FILE_SIZE || "5", 10),
    },
  },

  // Database configuration
  database: {
    uri: {
      id: 2,
      title: "MONGODB_URI",
      description: "MongoDB connection URI",
      value: process.env.MONGODB_URI,
    },
    name: {
      id: 23,
      title: "DB_NAME",
      description: "Database name",
      value: "HybridRealtyDB",
    },
    options: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    },
  },

  // Authentication configuration
  auth: {
    jwtSecret: {
      id: 3,
      title: "JWT_SECRET",
      description: "Secret for JWT tokens",
      value: requireEnv(
        "JWT_SECRET",
        "dev-jwt-secret-do-not-use-in-production"
      ),
    },
    jwtExpiry: {
      id: 4,
      title: "JWT_EXPIRY",
      description: "JWT token expiration time in seconds",
      value: parseInt(process.env.JWT_EXPIRY || "86400", 10),
    },
    refreshTokenSecret: {
      id: 5,
      title: "REFRESH_TOKEN_SECRET",
      description: "Secret for refresh tokens",
      value: requireEnv(
        "REFRESH_TOKEN_SECRET",
        "dev-refresh-token-secret-do-not-use-in-production"
      ),
    },
    refreshTokenExpiry: {
      id: 24,
      title: "REFRESH_TOKEN_EXPIRY",
      description: "Refresh token expiration time in days",
      value: parseInt(process.env.REFRESH_TOKEN_EXPIRY || "7", 10),
    },
  },

  // Media storage configuration (Cloudinary)
  storage: {
    cloudinaryName: {
      id: 7,
      title: "CLOUDINARY_CLOUD_NAME",
      description: "Cloudinary cloud name for property images",
      value: process.env.CLOUDINARY_CLOUD_NAME,
    },
    cloudinaryApiKey: {
      id: 8,
      title: "CLOUDINARY_API_KEY",
      description: "Cloudinary API key",
      value: process.env.CLOUDINARY_API_KEY,
    },
    cloudinaryApiSecret: {
      id: 9,
      title: "CLOUDINARY_API_SECRET",
      description: "Cloudinary API secret",
      value: process.env.CLOUDINARY_API_SECRET,
    },
  },

  // Email configuration
  email: {
    service: {
      id: 10,
      title: "EMAIL_SERVICE",
      description: "Email service provider (e.g., 'gmail')",
      value: process.env.EMAIL_SERVICE || "smtp",
    },
    host: {
      id: 25,
      title: "EMAIL_HOST",
      description: "SMTP host server",
      value: process.env.EMAIL_HOST,
    },
    port: {
      id: 26,
      title: "EMAIL_PORT",
      description: "SMTP port",
      value: parseInt(process.env.EMAIL_PORT || "587", 10),
    },
    user: {
      id: 11,
      title: "EMAIL_USER",
      description: "Email username/address for sending notifications",
      value: process.env.EMAIL_USER,
    },
    password: {
      id: 12,
      title: "EMAIL_PASSWORD",
      description: "Email password or app-specific password",
      value: process.env.EMAIL_PASSWORD,
    },
    from: {
      id: 27,
      title: "EMAIL_FROM",
      description: "Default sender name and email",
      value: process.env.EMAIL_FROM || "Real Estate <noreply@realestate.com>",
    },
  },

  // Admin settings
  admin: {
    email: {
      id: 13,
      title: "ADMIN_EMAIL",
      description: "Default admin email for setup",
      value: process.env.ADMIN_EMAIL || "admin@realestate.com",
    },
    password: {
      id: 28,
      title: "ADMIN_PASSWORD",
      description: "Default admin password for initial setup",
      value: process.env.ADMIN_PASSWORD,
    },
    propertyApprovalRequired: {
      id: 18,
      title: "PROPERTY_APPROVAL_REQUIRED",
      description: "Flag to enable/disable property approval workflow",
      value: process.env.PROPERTY_APPROVAL_REQUIRED !== "false",
    },
  },

  // Feature-specific settings
  features: {
    aiChat: {
      enabled: {
        id: 21,
        title: "ENABLE_AI_CHAT",
        description: "Feature flag for AI chat functionality",
        value: process.env.ENABLE_AI_CHAT === "true",
      },
      apiKey: {
        id: 14,
        title: "AI_CHAT_API_KEY",
        description: "API key for AI chat support integration",
        value: process.env.AI_CHAT_API_KEY,
      },
    },
    payments: {
      stripeSecretKey: {
        id: 20,
        title: "STRIPE_SECRET_KEY",
        description: "Stripe secret key for payment processing",
        value: process.env.STRIPE_SECRET_KEY,
      },
      stripePublicKey: {
        id: 29,
        title: "STRIPE_PUBLIC_KEY",
        description: "Stripe publishable key for client-side integration",
        value: process.env.STRIPE_PUBLIC_KEY,
      },
      currency: {
        id: 30,
        title: "PAYMENT_CURRENCY",
        description: "Default currency for payments",
        value: process.env.PAYMENT_CURRENCY || "USD",
      },
    },
  },
};

export default constants;
