import { Router } from "express";
import * as sales_controller from "./sales.controller.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import {
  add_customer_validation,
  update_customer_schema,
  updateFollowUpStatus_schema,
  resecduleFollowUp_schema,
} from "./sales.schema.js";
const sales_router = Router();

sales_router.get("/employees/salesDept", sales_controller.getSalesEmployees);

sales_router.post(
  "/add",
  validation(add_customer_validation),
  error_handle(sales_controller.add_customer)
);
sales_router.get("/get_all", error_handle(sales_controller.get_all_customers));
sales_router.get(
  "/get_one/:_id",
  error_handle(sales_controller.get_one_customer)
);
sales_router.put(
  "/update/:_id",
  validation(update_customer_schema),
  error_handle(sales_controller.update_customer)
);
sales_router.delete(
  "/delete/:_id",
  error_handle(sales_controller.delete_customer)
);

sales_router.get("/followUps", sales_controller.getFollowUps);

sales_router.patch(
  "/updateFollowUpStatus/:id",
  validation(updateFollowUpStatus_schema),
  sales_controller.updateFollowUpStatus
);

sales_router.patch(
  "/resecduleFollowUp/:id",
  validation(resecduleFollowUp_schema),
  sales_controller.resecduleFollowUp
);

sales_router.get("/MyCustomers", sales_controller.getMyCustomersReport);
sales_router.get(
  "/team_performance",
  error_handle(sales_controller.team_performance)
);
export default sales_router;
