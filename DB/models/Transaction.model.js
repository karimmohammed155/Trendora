import mongoose from "../global-setup.js";
const { model, Schema } = mongoose;

const transaction_schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    method:{type: String, enum: ["visa", "wallet","cash"], required: true }
  },
  { timestamps: true, versionKey: false }
);

export const transaction =
  mongoose.models.transaction || model("transaction", transaction_schema);
