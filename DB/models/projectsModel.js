import mongoose, { model, Schema, Types } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true }, // Project title
  description: { type: String,required:true }, // Summary of project
  status: { 
    type: String, 
    enum: ["planned", "in_progress", "on_hold", "completed"], 
    default: "planned" 
  },
  department: { type: Types.ObjectId, ref: "Department" },
  members: [{ type: Types.ObjectId, ref: "Employee" }], // team members
  notes: { type: String }, // general notes / remarks
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true ,versionKey:false});

export const Project = model("Project", ProjectSchema);
