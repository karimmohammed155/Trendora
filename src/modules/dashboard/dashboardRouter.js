import { Router } from "express";
import * as dashboardSchema from "./dashboardSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import * as dashboardController from "./dashboardController.js";
import { auth } from "../../middlewares/auth_middleware.js";
const router = Router();

//Add leave
router.post(
  "/leaves",
  auth(),
  validation(dashboardSchema.addLeaveSchema),
  dashboardController.addLeave
);

//Add ticket
router.post(
  "/tickets",
  auth(),
  validation(dashboardSchema.addTicketSchema),
  dashboardController.addTicket
);

router.get("/leaves", auth(), dashboardController.getAllEmployeesLeaves);

router.get("/tickets", auth(), dashboardController.getAllEmployeesTickets);

//request Advance
router.post(
  "/advance",
  auth(),
  validation(dashboardSchema.requestAdvanceSchema),
  dashboardController.requestAdvance
);

//get employees Advances

router.get("/advance", auth(), dashboardController.getEmployeesAdvances);
export default router;
