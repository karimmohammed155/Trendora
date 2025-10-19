import mongoose, { model } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    sheet: {
      id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true, versionKey: false }
);

export const Attendance = model("Attendance", attendanceSchema);
