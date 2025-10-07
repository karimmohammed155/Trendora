import { Router } from "express";
import * as accounting_controller from "./accounting.controller.js";
import {
  error_handle,
  validation,
} from "../../middlewares/index.js";
import { addLeave, addTicket } from "../dashboard/dashboardController.js";
import {
  invoiceValidationSchema,
  update_invoice_schema,
} from "./accounting.validation.js";
import {
  addLeaveSchema,
  addTicketSchema,
} from "../dashboard/dashboardSchema.js";
const accounting_router = Router();

accounting_router.post(
  "/add_invoice",

  validation(invoiceValidationSchema),
  error_handle(accounting_controller.add_invoice)
);
accounting_router.put(
  "/update_invoice/:_id",

  validation(update_invoice_schema),
  error_handle(accounting_controller.update_invoice)
);
accounting_router.get(
  "/get_all",
  error_handle(accounting_controller.get_all_invoices)
);
accounting_router.get(
  "/get_invoice/:_id",
  error_handle(accounting_controller.get_invoice)
);
accounting_router.delete(
  "/delete_invoice/:id",

  error_handle(accounting_controller.delete_invoice)
);
accounting_router.post(
  "/leaves",
  validation(addLeaveSchema),
  addLeave);
accounting_router.post(
  "/tickets",
  validation(addTicketSchema),
  addTicket
);
export { accounting_router };
