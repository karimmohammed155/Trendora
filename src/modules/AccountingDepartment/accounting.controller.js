import { invoice } from "../../../DB/models/invoice.model.js";
import { transaction } from "../../../DB/models/Transaction.model.js";
import { api_features } from "../../utils/api_features.utils.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

// Add invoice api
export const add_invoice = async (req, res, next) => {
  const {
    invoice_type,
    description,
    client_name,
    amount,
    due_date,
    status,
    method,
  } = req.body;
  const invoice_object = {
    invoice_type,
    description,
    client_name,
    amount,
    due_date,
    status,
    method,
  };
  const new_invoice = await invoice.create(invoice_object);
  res
    .status(201)
    .json({ message: "invoice created successfully", new_invoice });
};
// Update invoice api
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
// Get all invoices api
export const get_all_invoices = async (req, res, next) => {
  const all_invoices = invoice.find();
  const new_api_feature = new api_features(all_invoices, req.query)
    .pagination()
    .sort();
  const find_invoice = await new_api_feature.mongoose_query;
  if (!find_invoice) {
    return next(
      new Error_handler_class("invoices not found", 404, "invoices not found")
    );
  }
  res.status(200).json(find_invoice);
};
// Delete api invoice
export const delete_invoice = async (req, res, next) => {
  const { id } = req.params;
  const del_invoice = await invoice.findByIdAndDelete({ _id: id });
  if (!del_invoice) {
    return next(
      new Error_handler_class("invoice not found", 400, "delete invoice api")
    );
  }
  res.status(200).json({ message: "invoice deleted successfully" });
};
// Get invoice by id api
export const get_invoice = async (req, res, next) => {
  const { _id } = req.params;
  const one_invoice = await invoice.findById(_id);
  if (!one_invoice) {
    return next(
      new Error_handler_class("invoice not found", 404, "invoice not found")
    );
  }
  res.status(200).json(one_invoice);
};
// Add Transaction api
export const add_transaction = async (req, res, next) => {
  const { description, amount, date, type, method } = req.body;
  const new_transaction = await transaction.create({
    description,
    amount,
    date,
    type,
    method,
  });
  res
    .status(201)
    .json({ message: "Transaction created successfully", new_transaction });
};
// Update Transaction api
export const update_transaction = async (req, res, next) => {
  const { _id } = req.params;
  const new_trans = await transaction.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );
  if (!new_trans) {
    return next(
      new Error_handler_class(
        "Transaction not found",
        400,
        "update transaction api"
      )
    );
  }
  await new_trans.save();
  res
    .status(200)
    .json({ message: "Transaction updated successfully", new_trans });
};
// Get all transactions api
export const get_all_transactions = async (req, res, next) => {
  const all_transactions = transaction.find();
  const new_api_feature = new api_features(all_transactions, req.query)
    .pagination()
    .sort();
  const find_transaction = await new_api_feature.mongoose_query;
  if (!find_transaction) {
    return next(
      new Error_handler_class(
        "transactions not found",
        404,
        "transactions not found"
      )
    );
  }
  res.status(200).json(find_transaction);
};
// Delete api invoice
export const delete_transaction = async (req, res, next) => {
  const { id } = req.params;
  const del_transaction = await transaction.findByIdAndDelete({ _id: id });
  if (!del_transaction) {
    return next(
      new Error_handler_class(
        "Transaction not found",
        400,
        "delete transaction api"
      )
    );
  }
  res.status(200).json({ message: "Transaction deleted successfully" });
};
// Get transaction by id api
export const get_transaction = async (req, res, next) => {
  const { _id } = req.params;
  const one_transaction = await transaction.findById(_id);
  if (!one_transaction) {
    return next(
      new Error_handler_class(
        "Transaction not found",
        404,
        "Transaction not found"
      )
    );
  }
  res.status(200).json(one_transaction);
};
export const get_summary = async (req, res, next) => {
  const income = await transaction.aggregate([
    { $match: { type: "income" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const expense = await transaction.aggregate([
    { $match: { type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const total_revenue = income[0]?.total || 0;
  const total_expenses = expense[0]?.total || 0;
  const net_profit = total_revenue - total_expenses;
  res.status(200).json({
    total_revenue,
    total_expenses,
    net_profit,
  });
};
