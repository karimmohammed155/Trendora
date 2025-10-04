import { Router } from "express";
import { getRatingSchema, updateRatingSchema } from "../ITDepartment/ITDeptSchema.js";
import { getRating, updateRating } from "../ITDepartment/ITDeptController.js";
import * as digitalMarketingController from "./digitalMarketingController.js";
import * as digitalMarketingSchema from "./digitalMarketingSchema.js";
import { auth } from "../../middlewares/auth_middleware.js";    
import { validation } from "../../middlewares/validationMiddleware.js";
import { addLeaveSchema, addTicketSchema } from "../dashboard/dashboardSchema.js";
import { addLeave, addTicket } from "../dashboard/dashboardController.js";
import { authorization } from "../../middlewares/authorization.middleware.js";

const router=Router();

//ratings:
//rate employees
router.put("/employees/:id/rate",auth(),authorization('Admin'),validation(updateRatingSchema),updateRating);
//get ratings
router.get("/employees/:id/rate",auth(),validation(getRatingSchema),getRating);

//get all employees
router.get('/employees/digitalMarketing',auth(),digitalMarketingController.getAllDigitalMarketingEmployees);
//Campaigns:
//add project
router.post('/projects',auth(),authorization('Admin'),validation(digitalMarketingSchema.createProjectSchema),digitalMarketingController.createProject);
//get all projects
router.get('/projects',auth(),digitalMarketingController.getAllProjects);
//update project
router.put('/projects/:id',auth(),authorization('Admin'),validation(digitalMarketingSchema.updateProjectSchema),digitalMarketingController.updateProject);
//delete project
router.delete('/projects/:id',auth(),authorization('Admin'),validation(digitalMarketingSchema.deleteProjectSchema),digitalMarketingController.deleteProject);

//get all customers
router.get('/customers',auth(),digitalMarketingController.getAllCustomers);

//get customers projects
router.get('/customers/:customerName/projects',auth(),digitalMarketingController.getCustomerProjects);

////add leave
router.post('/leaves',auth(),validation(addLeaveSchema),addLeave);

//Add ticket
router.post('/tickets',auth(),validation(addTicketSchema),addTicket);


export default router;