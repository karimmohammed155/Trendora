import { Router } from "express";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { addLeaveSchema,addTicketSchema } from "./dashboardSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import { addLeave,addTicket } from "./dashboardController.js";
const router= Router();

//Add leave
router.post('/leaves',validation(addLeaveSchema),addLeave);

//Add ticket
router.post('/tickets',validation(addTicketSchema),addTicket);

export default router;