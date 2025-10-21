import { Router } from "express";
import * as operationController from "./operationController.js";
import * as operationSchema from "./operationSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import {
  updateRating,
  getRating,
  getDepartmentLeaves,
} from "../ITDepartment/ITDeptController.js";
import {
  updateRatingSchema,
  getRatingSchema,
} from "../ITDepartment/ITDeptSchema.js";
import {
  addLeaveSchema,
  addTicketSchema,
} from "../dashboard/dashboardSchema.js";
import { addLeave, addTicket } from "../dashboard/dashboardController.js";

import {
  deleteLeaveSchema,
  updateLeaveSchema,
} from "../HRDepartment/HRDeptSchema.js";
import {
  deleteLeave,
  updateLeaveStatus,
} from "../HRDepartment/HRDeptController.js";

const router = Router();

//ratings:
//rate employees
router.put("/employees/:id/rate", validation(updateRatingSchema), updateRating);
//get ratings
router.get("/employees/:id/rate", validation(getRatingSchema), getRating);

//get all employees
router.get(
  "/employees/operationDept",
  operationController.getAllOperationEmployees
);
//Campaigns:
//add campaign
router.post(
  "/campaigns",
  validation(operationSchema.addCampaignSchema),
  operationController.addCampaign
);
//get all campaigns
router.get("/campaigns", operationController.getAllCampaigns);
//update campaign
router.put(
  "/campaigns/:id",
  validation(operationSchema.updateCampaignSchema),
  operationController.updateCampaign
);
//delete campaign
router.delete(
  "/campaigns/:id",
  validation(operationSchema.deleteCampaignSchema),
  operationController.deleteCampaign
);

////add leave
router.post("/leaves", validation(addLeaveSchema), addLeave);

//Add ticket
router.post("/tickets", validation(addTicketSchema), addTicket);

//get Departments leaves
router.get("/OperationLeaves/:departmentId", getDepartmentLeaves);

//update leave status
router.put("/leaves/:id", validation(updateLeaveSchema), updateLeaveStatus);

//delete leave
router.delete("/leaves/:id", validation(deleteLeaveSchema), deleteLeave);

export default router;
