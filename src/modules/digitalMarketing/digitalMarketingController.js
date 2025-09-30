import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { Project } from "../../../DB/models/projectsModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


//get all employees
export const getAllDigitalMarketingEmployees=asyncHandler(async(req,res,next)=>{

    const department=await Department.findOne({name:"Digital Marketing"});
    if(!department){
        return next(new Error("Digital Marketing Department not found",{cause:404}));
    }

    const employees=await Employee.find({department:department}).select("firstName lastName email position rating note");
    if(employees.length===0){
        return next(new Error("No employees found in Digital Marketing department",{cause:404}));
    }
    res.status(200).json({
        success:true,
        data:employees,
        totalEmployees:employees.length
    });
});

//projects

//  Create new project
export const createProject=asyncHandler(async(req,res,next)=>{
    const { name, description, status, members, notes, startDate, endDate } = req.body;



    // Validate members exist
    const existingMembers = await Employee.find({ _id: { $in: members } });
    if (existingMembers.length !== members.length) {
        return next(new Error("One or more members do not exist",{cause:400}));
    }
    const department=await Department.findOne({name:"Digital Marketing"});
    if(!department){
        return next(new Error("Digital Marketing Department not found",{cause:404}));
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

    const department=await Department.findOne({name:"Digital Marketing"});
    if(!department){
        return next(new Error("Digital Marketing Department not found",{cause:404}));
    }

    const projects=await Project.find({department}).populate('members','firstName lastName email position startDate endDate');
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