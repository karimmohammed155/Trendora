import { Router } from "express";
import * as operationController from "./operationController.js";
import * as operationSchema from "./operationSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import { updateRating,getRating } from "../ITDepartment/ITDeptController.js";
import { updateRatingSchema,getRatingSchema } from "../ITDepartment/ITDeptSchema.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { addLeaveSchema, addTicketSchema } from "../dashboard/dashboardSchema.js";
import { addLeave, addTicket } from "../dashboard/dashboardController.js";
import { auth } from "../../middlewares/auth_middleware.js";
const router = Router();

//ratings:
//rate employees
router.put("/employees/:id/rate",auth(),validation(updateRatingSchema),updateRating);
//get ratings
router.get("/employees/:id/rate",auth(),validation(getRatingSchema),getRating);

//get all employees
router.get('/employees/operationDept',auth(),operationController.getAllOperationEmployees);
//Campaigns:
//add campaign
router.post('/campaigns',auth(),validation(operationSchema.addCampaignSchema),operationController.addCampaign);
//get all campaigns
router.get('/campaigns',auth(),operationController.getAllCampaigns);
//update campaign
router.put('/campaigns/:id',auth(),validation(operationSchema.updateCampaignSchema),operationController.updateCampaign);
//delete campaign
router.delete('/campaigns/:id',auth(),validation(operationSchema.deleteCampaignSchema),operationController.deleteCampaign);


////add leave
router.post('/leaves',auth(),validation(addLeaveSchema),addLeave);

//Add ticket
router.post('/tickets',auth(),validation(addTicketSchema),addTicket);

export default router;