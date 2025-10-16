import joi from "joi";
import { isValidObjectId } from "../../middlewares/validationMiddleware.js";

//campagins
//add campaign
export const addCampaignSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  description: joi.string().allow("").max(500).optional(),
  customerName: joi.string().max(100).optional(),
  startDate: joi.date().required(),
  endDate: joi.date().greater(joi.ref("startDate")).required(),
  status: joi
    .string()
    .valid("planned", "active", "paused", "completed")
    .optional(),
  notes: joi.string().max(500).allow("").optional(),
});

//update campaign
export const updateCampaignSchema = joi.object({
  id: joi.custom(isValidObjectId).required(),
  name: joi.string().min(3).max(50).optional(),
  customerName: joi.string().max(100).optional(),
  description: joi.string().allow("").max(500).optional(),
  startDate: joi.date().optional(),
  endDate: joi.date().greater(joi.ref("startDate")).optional(),
  status: joi
    .string()
    .valid("planned", "active", "paused", "completed")
    .optional(),
  notes: joi.string().max(500).allow("").optional(),
});

//delete campaign
export const deleteCampaignSchema = joi.object({
  id: joi.custom(isValidObjectId).required(),
});
