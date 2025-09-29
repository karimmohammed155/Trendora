import { Router } from "express";
import * as accounting_controller from "./accounting.controller.js";
import { validation } from "../../middlewares/index.js";
import { invoiceValidationSchema } from "./accounting.validation.js";
const accounting_router = Router();

accounting_router.post(
  "/add_invoice",
  validation(invoiceValidationSchema),
  accounting_controller.add_invoice
);

export { accounting_router };
