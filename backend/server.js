const express = require("express");
const cors = require("cors");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
connectDB();

// Initialize Passport Strategy Config
require("./config/passport");

const homestayRoutes = require("./routes/homestayRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

// Configure dynamic CORS with fallback to dev localhost:3000
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Rate Limiting for Auth routes: 5 attempts per 15 minutes
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many login or registration attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/login", authRateLimiter);
app.use("/api/auth/register", authRateLimiter);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API ROUTES
app.use("/api/homestays", homestayRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// NOT FOUND HANDLER
app.use(notFoundHandler);

// CENTRALIZED ERROR HANDLER
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

