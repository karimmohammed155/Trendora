import mongoose, { Schema, model, Types } from "mongoose";

const PayrollSchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: "Employee", // reference to Employee
    required: true
  },
  baseSalary: { type: Number, required: true }, // fixed monthly/annual salary
  overtimeHours: { type: Number, default: 0 }, 
  overtimeRate: { type: Number, default: 0 }, // per hour extra rate
  bonuses: { type: Number, default: 0 }, 
  deductions: { type: Number, default: 0 }, // loans, penalties, etc.
  benefits: { type: Number, default: 0 }, // allowances, insurance contributions etc.
  taxes: { type: Number, default: 0 }, // auto-calculated or entered
  netPay: { type: Number }, // final take-home pay after deductions
  payDate: { type: String, required: true }, // e.g., "Sep-2025" or "Q3-2025"
  status: { 
    type: String, 
    enum: ["pending", "paid"], 
    default: "pending" 
  }
}, { timestamps: true ,versionKey:false});


export const Payroll = model("Payroll", PayrollSchema);
