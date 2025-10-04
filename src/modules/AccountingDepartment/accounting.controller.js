import { invoice } from "../../../DB/models/invoice.model.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const add_invoice = async (req, res, next) => {
  const { invoice_type, description, client_name, amount, due_date, status } =
    req.body;
  const invoice_object = {
    invoice_type,
    description,
    client_name,
    amount,
    due_date,
    status,
  };
  const new_invoice = await invoice.create(invoice_object);
  res
    .status(201)
    .json({ message: "invoice created successfully", new_invoice });
};
export const update_invoice = async (req, res, next) => {
  const { _id } = req.params;
  const new_inv = await invoice.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );
  if (!new_inv) {
    return next(
      new Error_handler_class("invoice not found", 400, "update invoice api")
    );
  }
  await new_inv.save();
  res.status(200).json({ message: "invoice updated successfully", new_inv });
};
export const get_all_invoices = async (req, res, next) => {
  const all_invoices = await invoice.find();
  res.status(200).json(all_invoices);
};
