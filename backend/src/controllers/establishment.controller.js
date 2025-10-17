import { Establishment } from "../models/establishment.model.js";

/**
 * Crear un nuevo establecimiento
 */
export const createEstablishment = async (req, res) => {
  const { name, area, parcel } = req.body;

  try {
    // Validar campos requeridos
    if (!name || !area) {
      return res.status(400).json({
        msg: "Los campos 'name' y 'area' son requeridos",
      });
    }

    // Crear nuevo establecimiento
    const establishment = await Establishment.create({
      name,
      area,
      parcel,
    });

    return res.status(201).json({
      msg: "Establecimiento creado correctamente",
      data: establishment,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Ya existe un establecimiento con ese nombre",
      });
    }

    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

/**
 * Obtener todos los establecimientos
 */
export const getAllEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find().populate("parcel");
    return res.status(200).json({
      data: establishments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

/**
 * Obtener un establecimiento por ID
 */
export const getEstablishmentById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        msg: "Debe proporcionar un ID válido",
      });
    }

    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return res.status(404).json({
        msg: "No se encontró el establecimiento solicitado",
      });
    }

    return res.status(200).json({
      data: establishment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

/**
 * Actualizar un establecimiento por ID
 */
export const updateEstablishment = async (req, res) => {
  const { id } = req.params;
  const { name, area, parcel } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        msg: "Debe proporcionar un ID válido",
      });
    }

    const updated = await Establishment.findByIdAndUpdate(
      id,
      { name, area, parcel },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        msg: "No se encontró el establecimiento para actualizar",
      });
    }

    return res.status(200).json({
      msg: "Establecimiento actualizado correctamente",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

/**
 * Eliminar un establecimiento por ID
 */
export const deleteEstablishment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Establishment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        msg: "No se encontró el establecimiento para eliminar",
      });
    }

    return res.status(200).json({
      msg: "Establecimiento eliminado correctamente",
      data: deleted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

