import { Router } from "express";
import { addLeaveSchema,addTicketSchema } from "./dashboardSchema.js";
import { validation } from "../../middlewares/validationMiddleware.js";
import { addLeave,addTicket, getAllEmployeesLeaves } from "./dashboardController.js";
import { auth } from "../../middlewares/auth_middleware.js";
const router= Router();

//Add leave
router.post('/leaves',auth(),validation(addLeaveSchema),addLeave);

//Add ticket
router.post('/tickets',auth(),validation(addTicketSchema),addTicket);

router.get('/leaves',auth(),getAllEmployeesLeaves)

export default router;