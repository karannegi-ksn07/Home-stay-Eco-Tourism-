const express = require("express");
const router = express.Router();
const { homestayAssistant } = require("../controllers/aiController");

// Public route for the AI homestay assistant
router.post("/homestay-assistant", homestayAssistant);

module.exports = router;
