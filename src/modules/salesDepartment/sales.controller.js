import { customer } from "../../../DB/models/customer.model.js";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const getSalesEmployees = asyncHandler(async (req, res, next) => {
  const department = await Department.findOne({ name: "Sales" });
  if (!department) {
    return next(new Error("Sales Department not found", { cause: 404 }));
  }

  const employees = await Employee.find({ department: department._id }).select(
    "firstName lastName "
  );
  if (employees.length === 0) {
    return next(
      new Error("No employees found in Sales department", { cause: 404 })
    );
  }
  const totalEmployees = employees.length;
  return res.status(200).json({
    success: true,
    data: employees,
    totalEmployees,
  });
});

export const add_customer = async (req, res, next) => {
  const new_customer = await customer.create({ ...req.body });
  res
    .status(201)
    .json({ message: "customer added successfully", Data: new_customer });
};
export const get_all_customers = async (req, res, next) => {
  const all_customers = customer.find();
  const new_api_feature = new api_features(all_customers, req.query)
    .filters()
    .sort()
    .pagination();
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
export const update_customer = async (req, res, next) => {
  const { _id } = req.params;
  const upd_customer = await customer.findOneAndUpdate(
    { _id: _id },
    { ...req.body },
    { new: true }
  );
  if (!upd_customer) {
    next(
      new Error_handler_class("customer not found", 404, "update customer api")
    );
  }
  res
    .status(200)
    .json({ message: "Customer updated successfully", Data: upd_customer });
};
export const delete_customer = async (req, res, next) => {
  const { _id } = req.params;
  const del_customer = await customer.findByIdAndDelete(_id);
  if (!del_customer) {
    next(
      new Error_handler_class("customer not found", 404, "delete customer api")
    );
  }
  res.status(200).json({ message: "Customer deleted successfully" });
};

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
    filter.Next_Followup_Date = { $gte: today, $lt: tomorrow };
  }

  if (type === "overdue") {
    filter.Next_Followup_Date = { $lt: today };
  }

  if (type === "upcoming") {
    filter.Next_Followup_Date = { $gte: tomorrow, $lte: next7 };
  }

  const results = await customer
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ Next_Followup_Date: 1 });
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
    return next(new Error("customer not found", { cause: 404 }));
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
    { Next_Followup_Date: newDate },
    { new: true }
  );

  if (!followUp) {
    return next(new Error("customer not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Follow up reschduled successfully",
    data: followUp,
  });
});
export const team_performance = async (req, res, next) => {
  const customers_sales = await customer.aggregate([
    { $group: { _id: "$assigned_to", count: { $sum: 1 } } },
  ]);
  const won_deals = await customer.aggregate([
    { $match: { status: "Won" } },
    { $group: { _id: "$assigned_to", won: { $sum: 1 } } },
  ]);
  const won_budget = await customer.aggregate([
    { $match: { status: "Won" } },
    { $group: { _id: "$assigned_to", total: { $sum: "$Budget" } } },
  ]);
  res.status(200).json({
    customers_sales: customers_sales,
    won_deals: won_deals,
    won_budget: won_budget,
  });
};

export const getMyCustomersReport = asyncHandler(async (req, res, next) => {
  const sales_resp = req.authEmployee._id;

  const results = await customer.aggregate([
    { $match: { assigned_to: sales_resp } },
    {
      $group: {
        _id: "$status",
        customers: { $push: "$$ROOT" },
        count: { $sum: 1 },
        totalBudget: { $sum: "$Budget" },
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "My customers report generated successfully",
    data: results,
  });
});
export const services_demand = async (req, res, next) => {
  const services = await customer.aggregate([
    { $unwind: "$services" },
    { $group: { _id: "$services", count: { $sum: 1 } } },
  ]);
  res.status(200).json({ services: services });
};
