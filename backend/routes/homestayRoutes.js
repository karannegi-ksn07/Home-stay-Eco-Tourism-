const express = require("express");
const router = express.Router();
const homestayController = require("../controllers/homestayController");
const { protect } = require("../middleware/authMiddleware");

// Search endpoint (MUST be declared before /:id)
router.get("/search", homestayController.searchHomestays);

// Protected endpoint to fetch logged-in user's homestays
router.get("/my-listings", protect, homestayController.getMyHomestays);

// Standard CRUD endpoints
router.get("/", homestayController.getAllHomestays);
router.get("/:id", homestayController.getHomestayById);
router.post("/", protect, homestayController.createHomestay);
router.put("/:id", protect, homestayController.updateHomestay);
router.delete("/:id", protect, homestayController.deleteHomestay);

module.exports = router;
