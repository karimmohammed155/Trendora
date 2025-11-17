import joi from "joi";
import { isValidObjectId } from "../../middlewares/validationMiddleware.js";

export const add_customer_validation = joi
  .object({
    customer_name: joi.string().trim().required(),
    company_name: joi.string().trim().required(),
    phone_number: joi.string().pattern(/^[0-9]{10,15}$/).trim().required(),
    email: joi.string().email().optional().allow("", null),
    services: joi
      .array()
      .items(
        joi
          .string()
          .valid(
            "Influencer Marketing",
            "Event Management",
            "Social Media Management",
            "Professional Photography",
            "Lighting Services",
            "Screens & Displays",
            "Digital Advertising"
          )
      )
      .required(),
    Budget: joi.number().optional(),
    status: joi
      .string()
      .valid("New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost")
      .optional(),
    Next_Followup_Date: joi.date().optional().allow(""),
    notes: joi.string().optional().allow("", null),
    assigned_to: joi.string().optional().allow("", null),
  })
  .required();

export const update_customer_schema = joi.object({
  _id: joi.custom(isValidObjectId).required(),
  customer_name: joi.string().trim().optional(),
  company_name: joi.string().trim().optional(),
  phone_number: joi.string().pattern(/^[0-9]{10,15}$/).trim().optional(),
  email: joi.string().email().optional().allow("", null),
  services: joi
    .array()
    .items(
      joi
        .string()
        .valid(
          "Influencer Marketing",
          "Event Management",
          "Social Media Management",
          "Professional Photography",
          "Lighting Services",
          "Screens & Displays",
          "Digital Advertising"
        )
    )
    .optional(),
  Budget: joi.number().optional(),
  status: joi
    .string()
    .valid("New", "Contacted", "Proposal Sent", "Negotiating", "Won", "Lost")
    .optional(),
  Next_Followup_Date: joi.date().optional().allow(""),
  notes: joi.string().optional().allow("", null),
  assigned_to: joi.string().optional().allow("", null),
});

export const updateFollowUpStatus_schema = joi.object({
  id: joi.string().custom(isValidObjectId).required(),
});

export const resecduleFollowUp_schema = joi.object({
  id: joi.string().custom(isValidObjectId).required(),
  newDate: joi.date().required(),
});
