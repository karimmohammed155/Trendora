import { Router } from "express";
import {
  getRatingSchema,
  updateRatingSchema,
} from "../ITDepartment/ITDeptSchema.js";
import {
  getDepartmentLeaves,
  getRating,
  updateRating,
} from "../ITDepartment/ITDeptController.js";
import * as digitalMarketingController from "./digitalMarketingController.js";
import * as digitalMarketingSchema from "./digitalMarketingSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import {
  addLeaveSchema,
  addTicketSchema,
  requestAdvanceSchema,
} from "../dashboard/dashboardSchema.js";
import {
  addLeave,
  addTicket,
  requestAdvance,
} from "../dashboard/dashboardController.js";

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
  "/employees/digitalMarketing",
  digitalMarketingController.getAllDigitalMarketingEmployees
);
//Campaigns:
//add project
router.post(
  "/projects",
  validation(digitalMarketingSchema.createProjectSchema),
  digitalMarketingController.createProject
);
//get all projects
router.get("/projects", digitalMarketingController.getAllProjects);
//update project
router.put(
  "/projects/:id",
  validation(digitalMarketingSchema.updateProjectSchema),
  digitalMarketingController.updateProject
);
//delete project
router.delete(
  "/projects/:id",
  validation(digitalMarketingSchema.deleteProjectSchema),
  digitalMarketingController.deleteProject
);

//get all customers
router.get("/customers", digitalMarketingController.getAllCustomers);

//get customers projects
router.get(
  "/customers/:customerName/projects",
  digitalMarketingController.getCustomerProjects
);

////add leave
router.post("/leaves", validation(addLeaveSchema), addLeave);

//Add ticket
router.post("/tickets", validation(addTicketSchema), addTicket);

//get Digital Marketing Leaves
router.get("/DigitalMarketingLeaves/:departmentId", getDepartmentLeaves);

//update leave status
router.put("/leaves/:id", validation(updateLeaveSchema), updateLeaveStatus);

//delete leave
router.delete("/leaves/:id", validation(deleteLeaveSchema), deleteLeave);

//sumit advance
router.post("/advance", validation(requestAdvanceSchema), requestAdvance);

export default router;
