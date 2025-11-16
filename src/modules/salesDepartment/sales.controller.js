import { customer } from "../../../DB/models/customer.model.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const add_customer = async (req, res, next) => {
  const {
    customer_name,
    company_name,
    phone_number,
    email,
    services,
    status,
    Budget,
    Next_Followup_Date,
    notes,
    assigned_to,
  } = req.body;
  const new_customer = await customer.create({ ...req.body });
  res
    .status(201)
    .json({ message: "customer added successfully", Data: new_customer });
};
export const get_all_customers = async (req, res, next) => {
  const all_customers = customer.find();
  const new_api_feature = new api_features(all_customers, req.query)
    .pagination()
    .sort();
  const find_customer = await new_api_feature.mongoose_query;
  if (!find_customer) {
    return next(
      new Error_handler_class("customers not found", 404, "customers not found")
    );
  }
  res.status(200).json({ message: "all customers found", Data: find_customer });
};
export const get_one_customer = async (req, res, next) => {
  const { _id } = req.params;
  const one_customer = await customer.findById(_id);
  if (!one_customer) {
    return next(
      new Error_handler_class("customer not found", 404, "customer not found")
    );
  }
  res
    .status(200)
    .json({ message: "The customer that found", Data: one_customer });
};
// export const update_customer=async(req,res,next) =>{
//     const{_id}=req.params

//     const u_customer
// }

// follow up customers
export const getFollowUps = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { type } = req.query;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const next7 = new Date(today);
  next7.setDate(today.getDate() + 7);

  let filter = {
    status: { $nin: ["Contacted", "Won", "Lost"] }, // exclude these
  };

  if (type === "today") {
    filter.followUpDate = { $gte: today, $lt: tomorrow };
  }

  if (type === "overdue") {
    filter.followUpDate = { $lt: today };
  }

  if (type === "upcoming") {
    filter.followUpDate = { $gte: tomorrow, $lte: next7 };
  }

  const results = await FollowUp.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ followUpDate: 1 });
  return res.status(200).json({
    success: true,
    message: "Follow ups retrieved successfully",
    data: results,
  });
});

//mark as done
export const updateFollowUpStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const followUp = await customer.findByIdAndUpdate(
    id,
    { status: "Contacted" },
    { new: true }
  );
  if (!followUp) {
    return next(new Error("Follow up not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Follow up marked as contacted",
    data: followUp,
  });
});

// resecdule follow up
export const resecduleFollowUp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { newDate } = req.body;

  const followUp = await customer.findByIdAndUpdate(
    id,
    { followUpDate: newDate },
    { new: true }
  );

  if (!followUp) {
    return next(new Error("Follow up not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Follow up reschduled successfully",
    data: followUp,
  });
});
