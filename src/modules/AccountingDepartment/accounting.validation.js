import joi from "joi";
import { isValidObjectId } from "../../middlewares/index.js";

export const invoiceValidationSchema = joi
  .object({
    invoice_type: joi.string().valid("customer", "vendor").required(),
    client_name: joi.string().min(3).max(100).required(),
    description: joi.string().max(1000).allow(""),
    amount: joi.number().positive().required(),
    due_date: joi.date().required(),
    status: joi.string().valid("paid", "unpaid", "overdue").default("unpaid"),
    method: joi.string().valid("visa", "wallet", "cash").required(),
  })
  .required();

export const update_invoice_schema = joi
  .object({
    _id: joi.custom(isValidObjectId).required(),
    invoice_type: joi.string().valid("customer", "vendor").optional(),
    client_name: joi.string().min(3).max(100).optional(),
    description: joi.string().max(1000).allow(""),
    amount: joi.number().positive().optional(),
    due_date: joi.date().optional(),
    status: joi.string().valid("paid", "unpaid", "overdue").default("unpaid"),
    method: joi.string().valid("visa", "wallet", "cash").optional(),
  })
  .required();

export const TransactionValidationSchema = joi
  .object({
    description: joi.string().max(1000).allow("").required(),
    amount: joi.number().positive().required(),
    date: joi.date().required(),
    type: joi.string().valid("income", "expense").required(),
    method: joi.string().valid("visa", "wallet", "cash").required(),
  })
  .required();
export const update_transaction_schema = joi
  .object({
    _id: joi.custom(isValidObjectId).required(),
    description: joi.string().max(1000).allow("").optional(),
    amount: joi.number().positive().optional(),
    date: joi.date().optional(),
    type: joi.string().valid("income", "expense").optional(),
    method: joi.string().valid("visa", "wallet", "cash").optional(),
  })
  .required();
