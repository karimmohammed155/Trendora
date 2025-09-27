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