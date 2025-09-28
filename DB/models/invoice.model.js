import mongoose from "mongoose";
const { model, Schema } = mongoose;

const invoice_schema = new Schema(
  {
    invoice_type: {
      type: String,
      enum: ["customer", "vendor"],
      required: true,
    },
    client_name: String,
    amount: Number,
    due_date: Date,
    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
  },
  { timestamps: true, versionKey: false }
);

export const invoice =
  mongoose.models.invoice || model("invoice", invoice_schema);
