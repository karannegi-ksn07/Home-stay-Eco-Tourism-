const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
});

// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: `Welcome to your dashboard, ${req.user.name || req.user.email}!`,
    stats: {
      totalBookings: 0,
      favoriteHomestays: 0,
      memberSince: req.user.createdAt,
    },
  });
});

module.exports = router;
