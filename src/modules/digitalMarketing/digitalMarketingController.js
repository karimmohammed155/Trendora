import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { Project } from "../../../DB/models/projectsModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

//get all employees
export const getAllDigitalMarketingEmployees = asyncHandler(
  async (req, res, next) => {
    const department = await Department.findOne({ name: "Digital Marketing" });
    if (!department) {
      return next(
        new Error("Digital Marketing Department not found", { cause: 404 })
      );
    }

    const employees = await Employee.find({ department: department }).select(
      "firstName lastName email position rating note"
    );
    if (employees.length === 0) {
      return next(
        new Error("No employees found in Digital Marketing department", {
          cause: 404,
        })
      );
    }
    res.status(200).json({
      success: true,
      data: employees,
      totalEmployees: employees.length,
    });
  }
);

//projects

//  Create new project
export const createProject = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    customerName,
    status,
    members,
    notes,
    startDate,
    endDate,
  } = req.body;

  console.log("in controller", req.body);
  // Validate members exist
  const existingMembers = await Employee.find({ _id: { $in: members } });
  if (existingMembers.length !== members.length) {
    return next(new Error("One or more members do not exist", { cause: 400 }));
  }
  const department = await Department.findOne({ name: "Digital Marketing" });
  if (!department) {
    return next(
      new Error("Digital Marketing Department not found", { cause: 404 })
    );
  }

  const newProject = await Project.create({
    name,
    customerName,
    description,
    status,
    members,
    notes,
    startDate,
    endDate,
    department,
  });

  return res.status(200).json({
    success: true,
    message: "Project created successfully",
    data: newProject,
  });
});

//update project
export const updateProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    customerName,
    description,
    status,
    members,
    notes,
    startDate,
    endDate,
  } = req.body;

  const membersExit = await Employee.find({ _id: { $in: members } });
  if (membersExit.length !== members.length) {
    return next(new Error("One or more members do not exist", { cause: 400 }));
  }

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    {
      name,
      customerName,
      description,
      status,
      members,
      notes,
      startDate,
      endDate,
    },
    { new: true }
  );

  if (!updatedProject) {
    return next(new Error("No project with this id", { cause: 404 }));
  }

  return res.json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});

// GET /api/it/projects → Get all projects
export const getAllProjects = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const department = await Department.findOne({ name: "Digital Marketing" });
  if (!department) {
    return next(
      new Error("Digital Marketing Department not found", { cause: 404 })
    );
  }

  const projects = await Project.find({ department })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("members", "firstName lastName email position startDate endDate");
  if (projects.length === 0) {
    return next(new Error("No projects found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    data: projects,
    total: projects.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(projects.length / limit),
    createdAt: new Date(),
  });
});

// GET /api/customers
export const getAllCustomers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const customers = await Project.distinct("customerName");

  const paginatedCustomers = customers.slice(skip, skip + limit);

  if (!customers.length)
    return next(new Error("No customers found", { cause: 404 }));

  res.status(200).json({
    success: true,
    data: paginatedCustomers,
    total: customers.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(customers.length / limit),
    createdAt: new Date(),
  });
});

// GET /api/customers/:customerName/projects
export const getCustomerProjects = asyncHandler(async (req, res, next) => {
  const { customerName } = req.params;

  const department = await Department.findOne({ name: "Digital Marketing" });
  if (!department) {
    return next(
      new Error("Digital Marketing Department not found", { cause: 404 })
    );
  }

  // Base filter by customer and department
  const baseFilter = {
    customerName: { $regex: new RegExp(`^${customerName}$`, "i") }, // case-insensitive exact match
    department: department._id,
  };

  // Base Mongoose query
  const query = Project.find(baseFilter).populate(
    "members",
    "firstName lastName email"
  );

  // Apply API features (status filter, sorting, pagination)
  const features = new api_features(query, req.query)
    .filterByStatus()
    .sort()
    .pagination();

  const projects = await features.mongoose_query;

  // Conditional total count based on status
  const countFilter = { ...baseFilter };
  if (req.query.status && req.query.status !== "all") {
    countFilter.status = req.query.status;
  }
  const totalProjects = await Project.countDocuments(countFilter);

  if (projects.length === 0) {
    return next(new Error("No projects found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    data: projects,
    total: totalProjects,
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    totalPages: Math.ceil(totalProjects / (parseInt(req.query.limit) || 10)),
    createdAt: new Date(),
  });
});

// DELETE /api/it/projects/:id → Delete project
export const deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProject = await Project.findByIdAndDelete(id);

  if (!deletedProject) {
    return next(new Error("No project with this id", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});
