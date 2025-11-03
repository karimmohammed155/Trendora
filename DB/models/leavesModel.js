import mongoose, { model, Schema, Types } from "mongoose";

const LeaveSchema = new Schema(
  {
    employee: { type: Types.ObjectId, ref: "Employee", required: true },
    startDate: Date,
    endDate: Date,
    type: { type: String, enum: ["annual", "sick", "unpaid"], required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Leave = model("Leave", LeaveSchema);
