import { Attendance } from "../../../DB/models/attendanceModel.js";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { Project } from "../../../DB/models/projectsModel.js";
import { Ticket } from "../../../DB/models/ticketsModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cloudinary } from "../../utils/cloudinary.js";
import streamifier from "streamifier";

// GET /api/it/employees → Get all employees
export const getAllEmployees=asyncHandler(async(req,res,next)=>{

    const department=await Department.findOne({name:"IT"});
    if(!department){
        return next(new Error("IT Department not found",{cause:404}));
    }

    const employees=await Employee.find({department:department._id}).select("firstName lastName email position rating note");
    if(employees.length===0){
        return next(new Error("No employees found in IT department",{cause:404}));
    }
    const totalEmployees=employees.length;
    return res.status(200).json({
        success:true,
        data:employees
        ,totalEmployees,


    });
});

// Ratings
//update rating
export const updateRating=asyncHandler(async(req,res,next)=>{
    const { efficiency, performance,teamwork,note}=req.body;

    const {id}=req.params;



    const user=await Employee.findById(id);

    if(!user){
        return next(new Error("No user with this id",{cause:404}));
    }

    user.rating={efficiency,performance,teamwork};
    if(note){
        user.note=note;
    }
    user.rating.average=((efficiency+performance+teamwork)/3).toFixed(2);
    await user.save();

    return res.status(200).json({
        status:"success",
        message:"Rating added successfully",
        userRating:user.rating
    });
});


// GET rating
export const getRating=asyncHandler(async(req,res,next)=>{
    const {id}=req.params; 

    const user=await Employee.findById(id).select("name rating note");

    if(!user){
        return next(new Error("No user with this id",{cause:404}));
    }   

    return res.status(200).json({
        status:"success",
        data:user
    });

});






// 2. Projects

//  Create new project
export const createProject=asyncHandler(async(req,res,next)=>{
    const { name, description, status, members, notes, startDate, endDate } = req.body;



    // Validate members exist
    const existingMembers = await Employee.find({ _id: { $in: members } });
    if (existingMembers.length !== members.length) {
        return next(new Error("One or more members do not exist",{cause:400}));
    }
    const department=await Department.findOne({name:"IT"});
    if(!department){
        return next(new Error("IT Department not found",{cause:404}));
    }

    const newProject = await Project.create({ name, description, status, members, notes, startDate, endDate,department });

    return res.status(200).json({
        success:true,
        message:"Project created successfully",
        data:newProject
    })

});

//update project
export const updateProject=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {name, description, status, members, notes, startDate, endDate } = req.body;

    const membersExit=await Employee.find({_id:{$in:members}});
    if(membersExit.length!==members.length){
        return next(new Error("One or more members do not exist",{cause:400}));
    }

    const updatedProject=await Project.findByIdAndUpdate(id,
        {name, description, status, members, notes, startDate, endDate},
        {new:true}
    );

    if(!updatedProject){
        return next(new Error("No project with this id",{cause:404}));
    }   

    return res.json({
        success:true,
        message:"Project updated successfully",
        data:updatedProject
    });
});


// GET /api/it/projects → Get all projects
export const getAllProjects=asyncHandler(async(req,res,next)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const department=await Department.findOne({name:"IT"});
    if(!department){
        return next(new Error("IT Department not found",{cause:404}));
    }

    const projects=await Project.find({department}).skip(skip).limit(limit).populate('members','firstName lastName email position startDate endDate');
    if(projects.length===0){
        return next(new Error("No projects found",{cause:404}));
    }

    return res.status(200).json({
        success:true,
        data:projects
    });

});

// DELETE /api/it/projects/:id → Delete project
export const deleteProject=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;


    const deletedProject=await Project.findByIdAndDelete(id);

    if(!deletedProject){
        return next(new Error("No project with this id",{cause:404}));
    }   

    return res.status(200).json({
        success:true,
        message:"Project deleted successfully"
    });
});




// 3. Tickets 

//update ticket status
export const updateTicketStatus=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {status}=req.body;

    const updatedTicket=await Ticket.findByIdAndUpdate(id,
        {status},
        {new:true}
    );  

    if(!updatedTicket){
        return next(new Error("No ticket with this id",{cause:404}));
    }   

    return res.json({
        success:true,
        message:"Ticket status updated successfully",
        data:updatedTicket
    });
});

//delete ticket
export const deleteTicket=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;

    const deletedTicket=await Ticket.findByIdAndDelete(id);

    if(!deletedTicket){
        return next(new Error("No ticket with this id",{cause:404}));
    }   

    return res.status(200).json({
        success:true,
        message:"Ticket deleted successfully"
    })
});

//get all tickets assigned to IT department
export const getAllTickets=asyncHandler(async(req,res,next)=>{
    const page= parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tickets=await Ticket.find().skip(skip).limit(limit).populate('employee','firstName lastName email');

    if(tickets.length===0){
        return next(new Error("No tickets found",{cause:404}));
    }

    return res.status(200).json({
        success:true,
        data:tickets,
        crreatedAt:new Date()

    });
});


export const uploadSheet = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  // Convert buffer → Cloudinary upload stream
  const uploadFromBuffer = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `${process.env.CLOUD_FOLDER_NAME}/attendance`,
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
  const sheet = { id: public_id, url: secure_url };
  await Attendance.create({ sheet });

  return res.status(200).json({
    success: true,
    message: "Attendance sheet uploaded directly to Cloudinary successfully",
    data: sheet,
  });
});
