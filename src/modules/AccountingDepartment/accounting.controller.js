import { invoice } from "../../../DB/models/invoice.model.js";

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
