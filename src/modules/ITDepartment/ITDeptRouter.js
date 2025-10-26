import { Router } from "express";
import * as ITDeptController from "./ITDeptController.js";
import * as ITDeptSchema from "./ITDeptSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import {
  addLeaveSchema,
  requestAdvanceSchema,
} from "../dashboard/dashboardSchema.js";
import { addLeave, requestAdvance } from "../dashboard/dashboardController.js";
import { fileUpload } from "../../utils/fileUpload.js";
import {
  deleteLeaveSchema,
  updateLeaveSchema,
} from "../HRDepartment/HRDeptSchema.js";
import {
  deleteLeave,
  updateLeaveStatus,
} from "../HRDepartment/HRDeptController.js";
const router = Router();

//add leave
router.post("/leaves", validation(addLeaveSchema), addLeave);

//get all users
router.get("/employees/ITDeprt", ITDeptController.getAllEmployees);

//Ratings:
//update rating
router.put(
  "/employees/:id/rating",
  validation(ITDeptSchema.updateRatingSchema),
  ITDeptController.updateRating
);

//get rating
router.get(
  "/employee/:id/rating",
  validation(ITDeptSchema.getRatingSchema),
  ITDeptController.getRating
);

//Projects:
// Create new project
router.post(
  "/projects",
  validation(ITDeptSchema.createProjectSchema),
  ITDeptController.createProject
);

//update project
router.put(
  "/projects/:id",
  validation(ITDeptSchema.updateProjectSchema),
  ITDeptController.updateProject
);

//get all projects
router.get("/projects", ITDeptController.getAllProjects);

//delete project
router.delete(
  "/projects/:id",
  validation(ITDeptSchema.deleteProjectSchema),
  ITDeptController.deleteProject
);

//Tickets::
//update ticket
router.put(
  "/tickets/:id",
  validation(ITDeptSchema.updateTicketSchema),
  ITDeptController.updateTicketStatus
);

//delete ticket
router.delete(
  "/tickets/:id",
  validation(ITDeptSchema.deleteTicketSchema),
  ITDeptController.deleteTicket
);

//get all tickets
router.get("/tickets", ITDeptController.getAllTickets);

//upload sheet
router.post(
  "/attendance",
  fileUpload().single("sheet"),
  ITDeptController.uploadSheet
);

//get all departments leaves
router.get("/ItLeaves/:departmentId", ITDeptController.getDepartmentLeaves);

//update leave status
router.put("/leaves/:id", validation(updateLeaveSchema), updateLeaveStatus);

//delete leave
router.delete("/leaves/:id", validation(deleteLeaveSchema), deleteLeave);

//request advance
router.post("/advance", validation(requestAdvanceSchema), requestAdvance);

export default router;
