
import { Crop } from "../models/crop.model.js";
import { Parcel } from "../models/parcel.models.js";

// GET /api/parcels
export const getParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().populate("crop");
    res.json({ success: true, data: parcels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/parcels
export const createParcel = async (req, res) => {
  try {
    const { name, size, cropName, cycle, season } = req.body;

    if (!name || !size || !cropName)
      return res.status(400).json({ success: false, message: "Faltan datos obligatorios" });

    // 1️⃣ Crear la parcela
    const parcel = new Parcel({ name, size });
    await parcel.save();

    // 2️⃣ Crear el cultivo vinculado
    const crop = new Crop({
      name: cropName,
      cycle: cycle || "anual",
      season: season || "verano",
      parcelId: parcel._id
    });
    await crop.save();

    // 3️⃣ Asociar el cultivo a la parcela
    parcel.crop.push(crop._id);
    await parcel.save();

    res.status(201).json({
      success: true,
      message: "Parcela y cultivo creados correctamente",
      data: { parcel, crop }
    });
  } catch (err) {
    console.error("Error en createParcel:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
