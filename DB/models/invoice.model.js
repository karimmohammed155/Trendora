import mongoose from "../global-setup.js";
const { model, Schema } = mongoose;

const invoice_schema = new Schema(
  {
    invoice_type: {
      type: String,
      enum: ["customer", "vendor"],
      required: true,
    },
    client_name: String,
    description: String,
    amount: Number,
    due_date: String,
    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
    method: { type: String, enum: ["visa", "wallet", "cash"], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const invoice =
  mongoose.models.invoice || model("invoice", invoice_schema);
