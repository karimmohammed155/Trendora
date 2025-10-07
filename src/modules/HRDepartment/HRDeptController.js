import { hashSync } from "bcrypt";
import { Department } from "../../../DB/models/departmentModel.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import { Leave } from "../../../DB/models/leavesModel.js";
import { Payroll } from "../../../DB/models/payrollModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Attendance } from "../../../DB/models/attendanceModel.js";
import { cloudinary } from "../../utils/cloudinary.js";


//Employees
//add new employee
export const addNewEmployee=asyncHandler(async(req,res,next)=>{


    const department = await Department.findOne({ name: req.body.department });
    if (!department) {
        return next(new Error(`Department ${req.body.department} not found`, { cause: 404 }));
    }

    const passwordHashed=hashSync(`${req.body.firstName}@1234`, +process.env.SALT_ROUNDS);

    const employee=await Employee.create({...req.body,department:department._id,password:passwordHashed});
    return res.status(200).json({
        success:true,
        message:"Employee added successfully",
        data:employee
    });
});

//update employee
export const updateEmployee=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;

    
  
    const department = req.authEmployee.department

    const employee=await Employee.findByIdAndUpdate(id,{...req.body,department},{new:true});

    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        message:"Employee updated successfully",
        data:employee
    });
});

//delete employee
export const deleteEmployee=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const employee=await Employee.findByIdAndDelete(id);
    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        message:"Employee deleted successfully"
    });
});

//get all employees
export const getAllEmployees=asyncHandler(async(req,res,next)=>{
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const employees=await Employee.find().skip(skip).limit(limit).sort({ createdAt: -1 }); 
    if(employees.length===0){
        return next(new Error("No employees found",{cause:404}));
    }           
    const totalEmployees=employees.length;
    return res.status(200).json({
        success:true,
        data:employees,
        totalEmployees,
        
    });
});

//get employee by id
export const getEmployeeById=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const employee=await Employee.findById(id);
    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }   
    return res.status(200).json({
        success:true,
        data:employee,
        

    });
});

//Departments
//add new department
export const addNewDepartment=asyncHandler(async(req,res,next)=>{
    //check if department already exists
    const existingDepartment=await Department.findOne({name:req.body.name});
    if(existingDepartment){
        return next(new Error("Department already exists",{cause:409}));
    }       
    const department=await Department.create({ name: req.body.name });
    return res.status(200).json({
        success:true,
        message:"Department added successfully",
        data:department
    });
});

//update department
export const updateDepartment=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const { name: newName } = req.body;

       // Find the department
    const department = await Department.findById(id);
    if (!department) {
        return next(new Error("No department with this id", { cause: 404 }));
    }

    // Update department name
    department.name = newName;
    await department.save();

    // Update all employees that have this department ObjectId
    await Employee.updateMany(
        { department: department._id },
        { department: department._id } // ObjectId stays the same, name is in Department collection
    );

    return res.status(200).json({
        success: true,
        message: "Department updated successfully",
        data: department
    });
});

//delete department
export const deleteDepartment=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
   
    // Find the department
    const department = await Department.findById(id);
    if (!department) {
        return next(new Error("No department with this id", { cause: 404 }));
    }

    // Delete all employees in this department
    await Employee.deleteMany({ department: department._id });

    // Delete the department
    await department.deleteOne();

    return res.status(200).json({
        success:true,
        message:"Department deleted successfully"
    });
});

//get all departments
export const getAllDepartments=asyncHandler(async(req,res,next)=>{
    const departments=await Department.find();
    if(departments.length===0){
        return next(new Error("No departments found",{cause:404}));
    }   
    return res.status(200).json({
        success:true,
        data:departments    
    });
});

//Leaves
//get all leaves
export const getAllLeaves=asyncHandler(async(req,res,next)=>{  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; 
    const leaves=await Leave.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate('employee','firstName lastName email');
    if(leaves.length===0){
        return next(new Error("No leaves found",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        data:leaves
    });
});

//update leave status
export const updateLeaveStatus=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {status}=req.body;
    const updatedLeave=await Leave.findByIdAndUpdate(id,
        {status},
        {new:true}
    );  
    if(!updatedLeave){
        return next(new Error("No leave with this id",{cause:404}));
    }
    return res.json({
        success:true,
        message:"Leave status updated successfully",
        data:updatedLeave
    });
});

//delete leave
export const deleteLeave=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const deletedLeave=await Leave.findByIdAndDelete(id);
    if(!deletedLeave){
        return next(new Error("No leave with this id",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        message:"Leave deleted successfully"
    })
});

//payrolls::

//generate payslip
export const generatePayslip=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const employee=await Employee.findById(id);
    if(!employee){
        return next(new Error("No employee with this id",{cause:404}));
    }

      // extract values from req.body
  const {
    baseSalary,
    overtimeHours = 0,
    overtimeRate = 0,
    bonuses = 0,
    deductions = 0,
    benefits = 0,
    taxes = 0,
    payDate,
    status = "pending"
  } = req.body;

    const existingPayslip = await Payroll.findOne({
    employee: employee._id,
    payDate
  });

  if (existingPayslip) {
    return next(
      new Error(
        `Payslip for ${employee.firstName} ${employee.lastName} on ${payDate} already exists`,
        { cause: 409 }
      )
    );
  }
  // calculate net pay directly here
  const netPay =
    baseSalary +
    (overtimeHours * overtimeRate) +
    bonuses +
    benefits -
    (deductions + taxes);

  // create payroll with calculated netPay
  const payslip = await Payroll.create({
    employee: employee._id,
    baseSalary,
    overtimeHours,
    overtimeRate,
    bonuses,
    deductions,
    benefits,
    taxes,
    netPay,   // 👈 directly set here
    payDate,
    status
  });

    return res.status(200).json({
        success:true,
        message:"Payslip generated successfully",
        data:payslip
    });
});

//get all payroll
export const getPayroll=asyncHandler(async(req,res,next)=>{
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const payrolls=await Payroll.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate('employee','firstName lastName email position');
    if(payrolls.length===0){
        return next(new Error("No payrolls found",{cause:404}));
    }

    return res.status(200).json({
        success:true,
        data:payrolls
    });
});

//update payroll
export const updatePayroll=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
      const {
    baseSalary,
    overtimeHours = 0,
    overtimeRate = 0,
    bonuses = 0,
    deductions = 0,
    benefits = 0,
    taxes = 0,
  } = req.body;
      const netPay =
    baseSalary +
    (overtimeHours * overtimeRate) +
    bonuses +
    benefits -
    (deductions + taxes);
    const updatedPayroll=await Payroll.findByIdAndUpdate(id,
        {...req.body,netPay},
        {new:true}
    );

    if(!updatedPayroll){
        return next(new Error("No payroll with this id",{cause:404}));
    }   
    return res.json({
        success:true,
        message:"Payroll updated successfully",
        data:updatedPayroll
    });
});

//get specific payslip
export const getPayslip=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const employeeExists = await Employee.findById(id);
    if (!employeeExists) {
        return next(new Error("No employee with this id", { cause: 404 }));
    }

    // get all payrolls for this employee
    const payrolls = await Payroll.find({ employee: id })
        .populate('employee', 'firstName lastName email position')
        .sort({ payDate: -1 }); // latest first

    return res.status(200).json({
        success: true,
        data: payrolls
    });
});

export const deletePayroll=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const deletedPayroll=await Payroll.findByIdAndDelete(id);
    if(!deletedPayroll){
        return next(new Error("No payroll with this id",{cause:404}));
    }   
    return res.status(200).json({
        success:true,
        message:"Payroll deleted successfully"
    });
});

export const getAttendance=asyncHandler(async(req,res,next)=>{
    const page= parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sheets=await Attendance.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    if(sheets.length===0){
        return next(new Error("No attendance sheets found",{cause:404}));
    }
    return res.status(200).json({
        success:true,
        data:sheets
    });
});


export const deleteSheet=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;

    const attendance=await Attendance.findOne({ _id:id });

    if(!attendance){
        return next(new Error("No sheet with this id",{cause:404}));
    }
    // Delete from Cloudinary
     if (attendance.sheet?.id) {
      await cloudinary.uploader.destroy(attendance.sheet.id);
    }
    await Attendance.findByIdAndDelete(id);
    
    return res.status(200).json({
        success:true,
        message:"Attendance sheet deleted successfully"
    });

})