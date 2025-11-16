import { Router } from "express";
import * as sales_controller from "./sales.controller.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
const sales_router = Router();

sales_router.post("/add", error_handle(sales_controller.add_customer));
sales_router.get("/get_all", error_handle(sales_controller.get_all_customers));
sales_router.get(
  "/get_one/:_id",
  error_handle(sales_controller.get_one_customer)
);

export default sales_router;
