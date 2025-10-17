import { model, Schema, Types } from "mongoose";

const parcelSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  farmer: { type: String },
  crop: [{ type: Types.ObjectId, ref: "Crop" }],
  cattle: [{ type: String }], // por ahora como string o array simple
  lat: { type: Number },
  lng: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const Parcel = model("Parcel", parcelSchema);
