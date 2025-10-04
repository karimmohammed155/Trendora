import mongoose, { Schema, model, Types } from "mongoose";

const CampaignSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  customerName: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["planned", "active", "paused", "completed"],
    default: "planned",
  },
  notes: { type: String, trim: true },
}, { timestamps: true });

export const Campaign = model("Campaign", CampaignSchema);
