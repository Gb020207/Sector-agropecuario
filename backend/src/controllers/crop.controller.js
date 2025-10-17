import { Crop } from "../models/crop.model.js";

// GET /api/crops
export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json({ success: true, total: crops.length, data: crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/crops
export const createCrop = async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json({ success: true, data: crop });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
