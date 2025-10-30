import mongoose, { model, Schema, Types } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true }, // Project title
    description: { type: String }, // Summary of project
    customerName: { type: String, trim: true }, // Client or customer name
    status: {
      type: String,
      enum: ["planned", "in_progress", "on_hold", "completed"],
      default: "planned",
    },
    department: { type: Types.ObjectId, ref: "Department" },
    members: [{ type: Types.ObjectId, ref: "Employee" }], // team members
    notes: { type: String }, // general notes / remarks
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

export const Project = model("Project", ProjectSchema);
