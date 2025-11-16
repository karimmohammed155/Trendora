import mongoose from "mongoose";
const { model, Schema } = mongoose;

const customer_schema = new Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: String,
    services: {
      type: String,
      enum: [
        "Influencer Marketing",
        "Event Management",
        "Social Media Management",
        "Professional Photography",
        "Lighting Services",
        "Screens & Displays",
        "Digital Advertising",
      ],
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost"],
    },
    Budget: Number,
    Next_Followup_Date: Date,
    notes: String,
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true, versionKey: false }
);
customer_schema.index({
  customer_name: "text",
  company_name: "text",
  phone_number: "text",
});
export const customer =
  mongoose.models.customer || model("customer", customer_schema);
