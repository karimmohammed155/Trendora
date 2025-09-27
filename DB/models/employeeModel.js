import mongoose from "mongoose";
const { model, Schema } = mongoose;

const EmployeeSchema = new Schema(
  {
    userName: { type: String, required: true },
    department: { type: mongoose.Types.ObjectId, ref: "Department" },
    position: String,
    hireDate: Date,
    email: { type: String, unique: true, required: true },
    phone: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Accountant", "IT Staff", "Employee", "HR"],
      default: "Employee",
    },
    rating: {
      efficiency: { type: Number, min: 1, max: 5, default: 5 },
      performance: { type: Number, min: 1, max: 5, default: 5 },
      teamwork: { type: Number, min: 1, max: 5, default: 5 },
      average: { type: Number, default: 5 },
    },
    note: {
      type: String,
      min: 5,
      max: 500,
      default: "No notes",
    },
  },
  { timestamps: true, versionKey: false }
);
export const Employee =
  mongoose.models.Employee || model("Employee", EmployeeSchema);
