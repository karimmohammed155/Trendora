import joi from "joi";

//add leave
export const addLeaveSchema = joi
  .object({
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    type: joi
      .string()
      .valid("annual", "sick", "unpaid", "early", "emrgency")
      .required(),
    status: joi.string().valid("pending", "approved", "rejected"),
    leave_hour: joi.number().min(0).optional(),
  })
  .required();

//add ticket
export const addTicketSchema = joi
  .object({
    title: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(500).required(),
    priority: joi.string().valid("low", "medium", "high").required(),
  })
  .required();

//request Advance
export const requestAdvanceSchema = joi
  .object({
    amount: joi.number().min(1).required(),
    payrollMonth: joi.string().required(),
  })
  .required();
