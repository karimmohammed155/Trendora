import mongoose, { model, Schema, Types } from "mongoose";

const TicketSchema = new Schema({
  employee: { type: Types.ObjectId, ref: "Employee" }, // submitted by
  title: String,
  description: String,
  status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }
}, { timestamps: true, versionKey: false });


export const Ticket = model("Ticket", TicketSchema);
