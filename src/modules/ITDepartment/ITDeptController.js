import { Attendance } from "../../../DB/models/attendanceModel.js";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { Leave } from "../../../DB/models/leavesModel.js";
import { Project } from "../../../DB/models/projectsModel.js";
import { Ticket } from "../../../DB/models/ticketsModel.js";
import { api_features } from "../../utils/api_features.utils.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cloudinary } from "../../utils/cloudinary.js";
import streamifier from "streamifier";

// GET /api/it/employees → Get all employees
export const getAllEmployees = asyncHandler(async (req, res, next) => {
  const department = await Department.findOne({ name: "IT" });
  if (!department) {
    return next(new Error("IT Department not found", { cause: 404 }));
  }

  const employees = await Employee.find({ department: department._id }).select(
    "firstName lastName email position rating note"
  );
  if (employees.length === 0) {
    return next(
      new Error("No employees found in IT department", { cause: 404 })
    );
  }
  const totalEmployees = employees.length;
  return res.status(200).json({
    success: true,
    data: employees,
    totalEmployees,
  });
});

// Ratings
//update rating
export const updateRating = asyncHandler(async (req, res, next) => {
  const { efficiency, performance, teamwork, note } = req.body;

  const { id } = req.params;

  const user = await Employee.findById(id);

  if (!user) {
    return next(new Error("No user with this id", { cause: 404 }));
  }

  user.rating = { efficiency, performance, teamwork };
  if (note) {
    user.note = note;
  }
  user.rating.average = ((efficiency + performance + teamwork) / 3).toFixed(2);
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Rating added successfully",
    userRating: user.rating,
  });
});

// GET rating
export const getRating = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await Employee.findById(id).select("name rating note");

  if (!user) {
    return next(new Error("No user with this id", { cause: 404 }));
  }

  return res.status(200).json({
    status: "success",
    data: user,
  });
});

// 2. Projects

//  Create new project
export const createProject = asyncHandler(async (req, res, next) => {
  const { name, description, status, members, notes, startDate, endDate } =
    req.body;

  // Validate members exist
  const existingMembers = await Employee.find({ _id: { $in: members } });
  if (existingMembers.length !== members.length) {
    return next(new Error("One or more members do not exist", { cause: 400 }));
  }
  const department = await Department.findOne({ name: "IT" });
  if (!department) {
    return next(new Error("IT Department not found", { cause: 404 }));
  }

  const newProject = await Project.create({
    name,
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
  const { name, description, status, members, notes, startDate, endDate } =
    req.body;

  const membersExit = await Employee.find({ _id: { $in: members } });
  if (membersExit.length !== members.length) {
    return next(new Error("One or more members do not exist", { cause: 400 }));
  }

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { name, description, status, members, notes, startDate, endDate },
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

// GET /api/it/projects → Get all projectsexport const getAllProjects = asyncHandler(async (req, res, next) => {
export const getAllProjects = asyncHandler(async (req, res, next) => {
  // ✅ Find the department (you can later make this dynamic via query param)
  const department = await Department.findOne({ name: "IT" });
  if (!department) {
    return next(new Error("IT Department not found", { cause: 404 }));
  }

  // ✅ Base query: all projects for that department
  const query = Project.find({ department: department._id }).populate(
    "members",
    "firstName lastName email position startDate endDate"
  );

  // ✅ Apply filters, sorting, pagination
  const features = new api_features(query, req.query)
    .filterByStatus()
    .sort()
    .pagination();

  // ✅ Execute query
  const projects = await features.mongoose_query;

  // ✅ Conditional total count based on status
  let totalProjects;
  if (req.query.status && req.query.status !== "all") {
    totalProjects = await Project.countDocuments({
      department: department._id,
      status: req.query.status,
    });
  } else {
    totalProjects = await Project.countDocuments({
      department: department._id,
    });
  }

  if (projects.length === 0) {
    return next(new Error("No projects found", { cause: 404 }));
  }

  // ✅ Send response
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

// 3. Tickets

//update ticket status
export const updateTicketStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedTicket = await Ticket.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedTicket) {
    return next(new Error("No ticket with this id", { cause: 404 }));
  }

  return res.json({
    success: true,
    message: "Ticket status updated successfully",
    data: updatedTicket,
  });
});

//delete ticket
export const deleteTicket = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedTicket = await Ticket.findByIdAndDelete(id);

  if (!deletedTicket) {
    return next(new Error("No ticket with this id", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Ticket deleted successfully",
  });
});

//get all tickets assigned to IT department
export const getAllTickets = asyncHandler(async (req, res, next) => {
  // Get paginated tickets
  const query = Ticket.find();
  const features = new api_features(query, req.query)
    .filterByStatus()
    .sort()
    .pagination();

  const tickets = await features.mongoose_query;

  // ✅ Conditional total count based on status
  let totalTickets;
  if (req.query.status && req.query.status !== "all") {
    totalTickets = await Ticket.countDocuments({
      status: req.query.status,
    });
  } else {
    totalTickets = await Ticket.countDocuments();
  }
  if (tickets.length === 0 && page === 1) {
    return next(new Error("No tickets found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    data: tickets,
    total: totalTickets,
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    totalPages: Math.ceil(totalTickets / (parseInt(req.query.limit) || 10)),
    createdAt: new Date(),
  });
});

export const uploadSheet = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // Convert buffer → Cloudinary upload stream
  const uploadFromBuffer = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `${process.env.CLOUD_FOLDER_NAME}/attendance`,
          use_filename: true,
          //resource_type: "raw", // 👈 important for non-images (PDF/Excel)
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  };

  const { secure_url, public_id } = await uploadFromBuffer(req.file.buffer);

  // Save reference in DB
  const sheet = {
    id: public_id,
    url: secure_url,
    originalName: req.file.originalname,
  };
  await Attendance.create({ sheet });

  return res.status(200).json({
    success: true,
    message: "Attendance sheet uploaded directly to Cloudinary successfully",
    data: sheet,
  });
});

export const getDepartmentLeaves = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;

  // Step 1: Create the base query
  let query = Leave.find().populate({
    path: "employee",
    match: { department: departmentId },
    select: "firstName lastName email",
  });

  // Step 2: Apply API features before executing (if filter/sort/pagination are implemented)
  const features = new api_features(query, req.query)
    .filterByStatus()
    .sort()
    .pagination();

  // Step 3: Execute query
  const leaves = await features.mongoose_query;

  // Step 4: Filter null employees (not in the department)
  const filteredLeaves = leaves.filter((l) => l.employee !== null);

  if (filteredLeaves.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No leaves found for this department" });
  }

  // Step 5: Respond
  res.status(200).json({
    success: true,
    count: filteredLeaves.length,
    leaves: filteredLeaves,
  });
});
