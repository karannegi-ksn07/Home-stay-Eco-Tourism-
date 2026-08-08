const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose invalid ID/ObjectId format errors
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid resource ID format: ${err.value}`;
  }
  // Handle Mongoose schema validation failures
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map(el => el.message);
    message = `Validation failed: ${errors.join(", ")}`;
  }
  // Handle MongoDB unique constraint violations (duplicate keys)
  else if (err.code === 11000) {
    statusCode = 400;
    const duplicateKeys = Object.keys(err.keyValue || {});
    message = `A resource with this ${duplicateKeys.join(", ") || "field"} already exists.`;
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
