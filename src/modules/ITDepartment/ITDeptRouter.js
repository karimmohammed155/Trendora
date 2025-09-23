import { Router } from "express";
import * as ITDeptController from './ITDeptController.js';
import * as ITDeptSchema from './ITDeptSchema.js';
import { validation } from "../../middlewares/validationMiddleware.js";
const router=Router();

//get all users
router.get('/employees/ITDeprt',ITDeptController.getAllEmployees);


//Ratings:
//update rating
router.put('/employees/:id/rating',validation(ITDeptSchema.updateRatingSchema),ITDeptController.updateRating)

//get rating
router.get('/employee/:id/rating',validation(ITDeptSchema.getRatingSchema),ITDeptController.getRating)

//Projects:
// Create new project
router.post('/projects',validation(ITDeptSchema.createProjectSchema),ITDeptController.createProject)

//update project
router.put('/projects/:id',validation(ITDeptSchema.updateProjectSchema),ITDeptController.updateProject)

//get all projects
router.get('/projects',ITDeptController.getAllProjects);

//delete project
router.delete('/projects/:id',validation(ITDeptSchema.deleteProjectSchema),ITDeptController.deleteProject);

//Tickets::
//update ticket
router.put('/tickets/:id',validation(ITDeptSchema.updateTicketSchema),ITDeptController.updateTicketStatus);

//delete ticket
router.delete('/tickets/:id',validation(ITDeptSchema.deleteTicketSchema),ITDeptController.deleteTicket);

//get all tickets
router.get('/tickets',ITDeptController.getAllTickets);

export default router;