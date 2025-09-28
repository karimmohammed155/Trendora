import { Campaign } from "../../../DB/models/campaignModel.js";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



//get all operation employees
export const getAllOperationEmployees=asyncHandler(async(req,res,next)=>{

    const department=await Department.findOne({name:"Operation"});
    if(!department){
        return next(new Error("Operation Department not found",{cause:404}));
    }
    const employees=await Employee.find({department:department._id}).select("firstName lastName email position rating note");
    if(employees.length===0){
        return next(new Error("No employees found in Operation department",{cause:404}));
    }
    const totalEmployees=employees.length;
    return res.status(200).json({
        success:true,
        data:employees,
        totalEmployees
    }); 
});


//campaigns
//add campaign
export const addCampaign=asyncHandler(async(req,res,next)=>{
    const {name,description,startDate,endDate,status,notes}=req.body;




    const newCampaign=await Campaign.create({name,description,startDate,endDate,status,notes});

    return res.status(200).json({
        success:true,
        message:"Campaign added successfully",
        data:newCampaign
    })  
});

//get all campaigns
export const getAllCampaigns=asyncHandler(async(req,res,next)=>{
    const campaigns=await Campaign.find();
    if(campaigns.length===0){
        return next(new Error("No campaigns found",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        data:campaigns
    });
});

//update campaign
export const updateCampaign=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {name,description,startDate,endDate,status,notes}=req.body;

    const updatedCampaign=await Campaign.findByIdAndUpdate(id,
        {name,description,startDate,endDate,status,notes},
        {new:true}
    );
    if(!updatedCampaign){
        return next(new Error("No campaign with this id",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        message:"Campaign updated successfully",
        data:updatedCampaign
    });
});
//delete campaign
export const deleteCampaign=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const deletedCampaign=await Campaign.findByIdAndDelete(id);
    if(!deletedCampaign){
        return next(new Error("No campaign with this id",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        message:"Campaign deleted successfully"
    });
});



