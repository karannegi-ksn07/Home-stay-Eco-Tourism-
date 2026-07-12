const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// Local Auth routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:3000"}/login?error=OAuthFailed`,
    session: false,
  }),
  (req, res) => {
    // Generate JWT access token on success
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}/login?error=OAuthFailed`);
    }

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Redirect to frontend login page with JWT in query string for localStorage capture
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}/login?token=${token}`);
  }
);

module.exports = router;
