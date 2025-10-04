import { Router } from "express";
import * as accounting_controller from "./accounting.controller.js";
import {
  auth,
  authorization,
  error_handle,
  validation,
} from "../../middlewares/index.js";
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
  error_handle(accounting_controller.add_invoice)
);
accounting_router.put(
  "/update_invoice/:_id",
  auth(),
  authorization(["Admin", "Accountant"]),
  validation(update_invoice_schema),
  error_handle(accounting_controller.update_invoice)
);
accounting_router.get(
  "/get_all",
  auth(),
  authorization(["Admin", "Accountant"]),
  error_handle(accounting_controller.get_all_invoices)
);
accounting_router.delete(
  "/delete_invoice/:id",
  auth(),
  authorization(["Admin", "Accountant"]),
  error_handle(accounting_controller.delete_invoice)
);
export { accounting_router };
