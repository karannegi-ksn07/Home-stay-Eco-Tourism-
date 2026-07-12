const Homestay = require("../models/homestayModel");

// GET ALL
const getAllHomestays = async (req, res, next) => {
  try {
    const data = await Homestay.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// GET BY ID
const getHomestayById = async (req, res, next) => {
  try {
    const data = await Homestay.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// CREATE
const createHomestay = async (req, res, next) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const data = await Homestay.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// UPDATE
const updateHomestay = async (req, res, next) => {
  try {
    const data = await Homestay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// DELETE
const deleteHomestay = async (req, res, next) => {
  try {
    const data = await Homestay.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// SEARCH
const searchHomestays = async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const data = await Homestay.find(filter);
    res.json(data);
  } catch (err) {
    next(err);
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