import { Router } from "express";
import * as ITDeptController from './ITDeptController.js';
import * as ITDeptSchema from './ITDeptSchema.js';
import { validation } from "../../middlewares/validationMiddleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { auth } from "../../middlewares/auth_middleware.js";
import { addLeaveSchema } from "../dashboard/dashboardSchema.js";
import { addLeave } from "../dashboard/dashboardController.js";
import { fileUpload } from "../../utils/fileUpload.js";
const router=Router();

//add leave
router.post('/leaves',auth(),validation(addLeaveSchema),addLeave);

//get all users
router.get('/employees/ITDeprt',auth(),ITDeptController.getAllEmployees);


//Ratings:
//update rating
router.put('/employees/:id/rating',auth(),authorization('Admin'),validation(ITDeptSchema.updateRatingSchema),ITDeptController.updateRating)

//get rating
router.get('/employee/:id/rating',auth(),validation(ITDeptSchema.getRatingSchema),ITDeptController.getRating)

//Projects:
// Create new project
router.post('/projects',auth(),authorization('Admin'),validation(ITDeptSchema.createProjectSchema),ITDeptController.createProject)

//update project
router.put('/projects/:id',auth(),validation(ITDeptSchema.updateProjectSchema),ITDeptController.updateProject)

//get all projects
router.get('/projects',auth(),ITDeptController.getAllProjects);

//delete project
router.delete('/projects/:id',auth(),authorization('Admin'),validation(ITDeptSchema.deleteProjectSchema),ITDeptController.deleteProject);

//Tickets::
//update ticket
router.put('/tickets/:id',auth(),validation(ITDeptSchema.updateTicketSchema),ITDeptController.updateTicketStatus);

//delete ticket
router.delete('/tickets/:id',auth(),validation(ITDeptSchema.deleteTicketSchema),ITDeptController.deleteTicket);

//get all tickets
router.get('/tickets',auth(),ITDeptController.getAllTickets);

//upload sheet
router.post('/attendance',auth(),authorization('Admin'),fileUpload().single("sheet"),ITDeptController.uploadSheet);

export default router;