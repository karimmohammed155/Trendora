import mongoose, { model, Schema } from "mongoose";

const DepartmentSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
  }
}, { timestamps: true ,versionKey:false});

export const Department= model("Department", DepartmentSchema);
