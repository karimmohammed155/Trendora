import { Router } from "express";
import * as accounting_controller from "./accounting.controller.js";
import { auth, authorization, validation } from "../../middlewares/index.js";
import {
  invoiceValidationSchema,
  update_invoice_schema,
} from "./accounting.validation.js";
const accounting_router = Router();

accounting_router.post(
  "/add_invoice",
  auth(),
  authorization(["Admin", "Accountant"]),
  validation(invoiceValidationSchema),
  accounting_controller.add_invoice
);
accounting_router.put(
  "/update_invoice/:_id",
  auth(),
  authorization(["Admin", "Accountant"]),
  validation(update_invoice_schema),
  accounting_controller.update_invoice
);
accounting_router.get(
  "/get_all",
  auth(),
  authorization(["Admin", "Accountant"]),
  accounting_controller.get_all_invoices
);
export { accounting_router };
