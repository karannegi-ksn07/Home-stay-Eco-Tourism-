const express = require("express");
const router = express.Router();
const homestayController = require("../controllers/homestayController");

// Search endpoint (MUST be declared before /:id)
router.get("/search", homestayController.searchHomestays);

// Standard CRUD endpoints
router.get("/", homestayController.getAllHomestays);
router.get("/:id", homestayController.getHomestayById);
router.post("/", homestayController.createHomestay);
router.put("/:id", homestayController.updateHomestay);
router.delete("/:id", homestayController.deleteHomestay);

module.exports = router;
