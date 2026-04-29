const Property = require('../models/Property');

// @desc    Get all properties with optional filtering
// @route   GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, location } = req.query;
    let filter = {};

    // Text search across title, location, description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Location exact match filter
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching properties',
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }
    console.error('Error fetching property:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching property',
    });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
const createProperty = async (req, res) => {
  try {
    const { title, price, location, description, imageUrl } = req.body;

    const property = await Property.create({
      title,
      price,
      location,
      description,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    console.error('Error creating property:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while creating property',
    });
  }
};

// @desc    Delete single property by ID
// @route   DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }
    console.error('Error deleting property:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting property',
    });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
};
