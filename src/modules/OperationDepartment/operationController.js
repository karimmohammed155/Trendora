import { Campaign } from "../../../DB/models/campaignModel.js";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

//get all operation employees
export const getAllOperationEmployees = asyncHandler(async (req, res, next) => {
  const department = await Department.findOne({ name: "Operation" });
  if (!department) {
    return next(new Error("Operation Department not found", { cause: 404 }));
  }
  const employees = await Employee.find({ department: department._id }).select(
    "firstName lastName email position rating note"
  );
  if (employees.length === 0) {
    return next(
      new Error("No employees found in Operation department", { cause: 404 })
    );
  }
  const totalEmployees = employees.length;
  return res.status(200).json({
    success: true,
    data: employees,
    totalEmployees,
  });
});

//campaigns
//add campaign
export const addCampaign = asyncHandler(async (req, res, next) => {
  const { name, description, startDate, endDate, status, notes, customerName } =
    req.body;

  const newCampaign = await Campaign.create({
    name,
    customerName,
    description,
    startDate,
    endDate,
    status,
    notes,
  });

  return res.status(200).json({
    success: true,
    message: "Campaign added successfully",
    data: newCampaign,
  });
});

//get all campaignsexport const getAllCampaigns = asyncHandler(async (req, res, next) => {
export const getAllCampaigns = asyncHandler(async (req, res, next) => {
  // Pass the Mongoose query itself, not awaited result
  const query = Campaign.find();

  const features = new api_features(query, req.query)
    .filterByStatus()
    .sort()
    .pagination();

  const campaigns = await features.mongoose_query;

  // ✅ Conditional total count based on status
  let totalCampaigns;
  if (req.query.status && req.query.status !== "all") {
    totalCampaigns = await Campaign.countDocuments({
      status: req.query.status,
    });
  } else {
    totalCampaigns = await Campaign.countDocuments();
  }

  if (campaigns.length === 0) {
    return next(new Error("No campaigns found", { cause: 404 }));
  }

  // ✅ Send response
  return res.status(200).json({
    success: true,
    data: campaigns,
    total: totalCampaigns,
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    totalPages: Math.ceil(totalCampaigns / (parseInt(req.query.limit) || 10)),
    createdAt: new Date(),
  });
});

//update campaign
export const updateCampaign = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, customerName, description, startDate, endDate, status, notes } =
    req.body;

  const updatedCampaign = await Campaign.findByIdAndUpdate(
    id,
    { name, customerName, description, startDate, endDate, status, notes },
    { new: true }
  );
  if (!updatedCampaign) {
    return next(new Error("No campaign with this id", { cause: 404 }));
  }
  return res.status(200).json({
    success: true,
    message: "Campaign updated successfully",
    data: updatedCampaign,
  });
});
//delete campaign
export const deleteCampaign = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedCampaign = await Campaign.findByIdAndDelete(id);
  if (!deletedCampaign) {
    return next(new Error("No campaign with this id", { cause: 404 }));
  }
  return res.status(200).json({
    success: true,
    message: "Campaign deleted successfully",
  });
});
