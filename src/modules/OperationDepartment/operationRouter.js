import { Router } from "express";
import * as operationController from "./operationController.js";
import * as operationSchema from "./operationSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import { updateRating,getRating } from "../ITDepartment/ITDeptController.js";
import { updateRatingSchema,getRatingSchema } from "../ITDepartment/ITDeptSchema.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
const router = Router();

//ratings:
//rate employees
router.put("/employees/:id/rate",authorization('Admin'),validation(updateRatingSchema),updateRating);
//get ratings
router.get("/employees/:id/rate",validation(getRatingSchema),getRating);

//get all employees
router.get('/employees/operationDept',operationController.getAllOperationEmployees);
//Campaigns:
//add campaign
router.post('/campaigns',authorization('Admin'),validation(operationSchema.addCampaignSchema),operationController.addCampaign);
//get all campaigns
router.get('/campaigns',operationController.getAllCampaigns);
//update campaign
router.put('/campaigns/:id',authorization('Admin'),validation(operationSchema.updateCampaignSchema),operationController.updateCampaign);
//delete campaign
router.delete('/campaigns/:id',authorization('Admin'),validation(operationSchema.deleteCampaignSchema),operationController.deleteCampaign);

export default router;