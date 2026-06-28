const express = require("express");
const cors = require("cors");
require("dotenv").config();

const homestayRoutes = require("./routes/homestayRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API ROUTES
app.use("/api/homestays", homestayRoutes);

// NOT FOUND HANDLER
app.use(notFoundHandler);

// CENTRALIZED ERROR HANDLER
app.use(errorHandler);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
