// models/Advance.js

import mongoose, { model, Schema, Types } from "mongoose";

const advanceSchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "paid"],
    default: "pending",
  },
  payrollMonth: {
    type: String, // e.g. "2025-10"
    required: true,
  },
});
// Prevent OverwriteModelError
export const Advance =
  mongoose.models.Advance || model("Advance", advanceSchema);
