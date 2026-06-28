const homestayModel = require("../models/homestayModel");

// GET ALL HOMESTAYS
const getAllHomestays = (req, res, next) => {
  try {
    const data = homestayModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// GET HOMESTAY BY ID
const getHomestayById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID parameter" });
    }

    const homestay = homestayModel.getById(id);
    if (!homestay) {
      return res.status(404).json({ message: "Homestay not found" });
    }

    res.status(200).json(homestay);
  } catch (error) {
    next(error);
  }
};

// CREATE NEW HOMESTAY
const createHomestay = (req, res, next) => {
  try {
    const { name, location, price } = req.body;

    if (!name || !location || price === undefined) {
      return res.status(400).json({ message: "Name, location, and price are required" });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Price must be a valid positive number" });
    }

    const newHomestay = homestayModel.create({ name, location, price: numericPrice });
    res.status(201).json(newHomestay);
  } catch (error) {
    next(error);
  }
};

// UPDATE HOMESTAY (PUT/PATCH)
const updateHomestay = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID parameter" });
    }

    // Check if record exists first
    const existing = homestayModel.getById(id);
    if (!existing) {
      return res.status(404).json({ message: "Homestay not found" });
    }

    const { name, location, price } = req.body;

    // Validate price if it is provided for update
    if (price !== undefined) {
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({ message: "Price must be a valid positive number" });
      }
    }

    const updated = homestayModel.update(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE HOMESTAY
const deleteHomestay = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID parameter" });
    }

    const deleted = homestayModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Homestay not found" });
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

// SEARCH / FILTER / SORT HOMESTAYS (EXTRA ENDPOINT)
const searchHomestays = (req, res, next) => {
  try {
    const { location, minPrice, maxPrice, sortBy, order } = req.query;
    const results = homestayModel.search({ location, minPrice, maxPrice, sortBy, order });
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
  searchHomestays
};
