import joi from "joi";
import { isValidObjectId } from "../../middlewares/validationMiddleware.js";


//Projects:
// Create new project
export const createProjectSchema=joi.object({
    name:joi.string().min(3).max(100).required(),   
    description:joi.string().max(500).required(),
    status:joi.string().valid("planned", "in_progress", "on_hold", "completed").default("planned"),
    members:joi.array().items(joi.custom(isValidObjectId)).min(1).required(),
    notes:joi.string().max(1000).allow(""),
    startDate:joi.date().optional(),
    endDate:joi.date().optional()   
}).required();

//update project
export const updateProjectSchema=joi.object({
    id:joi.custom(isValidObjectId).required(),
    name:joi.string().min(3).max(100).optional(),   
    description:joi.string().max(500).optional(),
    status:joi.string().valid("planned", "in_progress", "on_hold", "completed").default("planned"),
    members:joi.array().items(joi.custom(isValidObjectId)).min(1).optional(),
    notes:joi.string().max(1000).allow(""),
    startDate:joi.date().optional(),
    endDate:joi.date().optional()   
}).required();

//delete project
export const deleteProjectSchema=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();

//Tickets:
//update ticket
export const updateTicketSchema=joi.object({
    id:joi.custom(isValidObjectId).required(),
    status:joi.string().valid("open", "in_progress", "resolved", "closed").required()
}).required();

//delete ticket
export const deleteTicketSchema=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();
