import { Employee } from "../../../DB/models/employeeModel.js";
import { Leave } from "../../../DB/models/leavesModel.js";
import { Ticket } from "../../../DB/models/ticketsModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addLeave=asyncHandler(async(req,res,next)=>{
    const employeeId=req.authEmployee._id;

    const employee=await Employee.findById(employeeId);
    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }

    const leave=await Leave.create({...req.body,employee:employeeId});

    return res.status(200).json({
        success:true,
        message:"Leave added successfully",
        data:leave
    });
});

export const addTicket=asyncHandler(async(req,res,next)=>{
    const employeeId=req.authEmployee._id;
    const employee=await Employee.findById(employeeId);
    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }
    const ticket=await Ticket.create({...req.body,employee:employeeId});

    return res.status(200).json({   
        success:true,
        message:"Ticket added successfully",
        data:ticket
    });
});

//get leaves for specific employee
export const getAllEmployeesLeaves = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

  const employeeId = req.authEmployee._id;

  const department=await Employee.findById(employeeId).populate('department');
  if(!department){
    return next(new Error("No employee with this id",{cause:404}));
  }

  const leaves = await Leave.find({ employee: employeeId }).skip(skip).limit(limit).sort({ createdAt: -1 })
    .populate('employee', 'firstName lastName email');

  if (!leaves || leaves.length === 0) {
    return next(new Error("No leaves found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    data: leaves,
    department:department.department.name
  });
});

export const getAllEmployeesTickets = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  const employeeId = req.authEmployee._id;


  const tickets= await Ticket.find({ employee: employeeId }).skip(skip).limit(limit).sort({ createdAt: -1 })
    .populate('employee', 'firstName lastName email');
  if (!tickets || tickets.length === 0) {
    return next(new Error("No tickets found", { cause: 404 }));
  }
  return res.status(200).json({
    success: true,
    data: tickets
  });
});

