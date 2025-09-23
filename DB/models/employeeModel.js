import { model, Schema, Types } from "mongoose";

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: Types.ObjectId, ref: "Department" },
  position: String,
  hireDate: Date,
  email: { type: String, unique: true, required: true },
  phone: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  role: { 
    type: String, 
    enum: ["Admin", "Manager", "Accountant", "IT Staff", "Employee","HR"], 
    default: "Employee" 
  },
rating: {
    efficiency: { type: Number, min: 1, max: 5, default: 5 },
    performance: { type: Number, min: 1, max: 5, default: 5 },
    teamwork: { type: Number, min: 1, max: 5, default: 5 },
    average: { type: Number, default: 5 }
  },
  note:{
    type: String,
    min: 5,
    max: 500,
    default: "No notes"
  }

}, { timestamps: true, versionKey: false });
export const Employee = model("Employee", EmployeeSchema);