import joi from "joi";

export const invoiceValidationSchema = joi
  .object({
    invoice_type: joi.string().valid("customer", "vendor").required(),
    client_name: joi.string().min(3).max(100).required(),
    description: joi.string().max(1000).allow(""),
    amount: joi.number().positive().required(),
    due_date: joi.date().greater("now").required(),
    status: joi.string().valid("paid", "unpaid", "overdue").default("unpaid"),
  })
  .required();
