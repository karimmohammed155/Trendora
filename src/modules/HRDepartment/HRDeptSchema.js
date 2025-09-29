import joi from 'joi';
import { isValidObjectId } from '../../middlewares/validationMiddleware.js';

//Employees:
//add new employee
export const addNewEmployee=joi.object({
    firstName:joi.string().min(3).max(50).required(),
    lastName:joi.string().min(3).max(50).required(),
    email:joi.string().email().required(),
    department:joi.string().required(),
    hireDate:joi.date().required(),
    phone:joi.string().pattern(/^[0-9]{10,15}$/).required(),
    status:joi.string().valid("active", "inactive").default("active"),
    role:joi.string().valid("Admin", "Manager", "Accountant", "IT Staff", "Employee","HR").default("Employee"),
    address:joi.string().min(5).max(200).optional(),
    submittedDocuments: joi.array().items(joi.string()).optional(),
    pendingDocuments: joi.array().items(joi.string()).optional(),
}).required();

//update employee
export const updateEmployee=joi.object({
    id:joi.custom(isValidObjectId).required(),
    firstName:joi.string().min(3).max(50).optional(),
    lastName:joi.string().min(3).max(50).optional(),
    email:joi.string().email().optional(),
    department:joi.string().valid("HR", "Accounting", "IT", "Administration","Operation").optional(),
    hireDate:joi.date().optional(),
    phone:joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    status:joi.string().valid("active", "inactive").default("active"),
    role:joi.string().valid("Admin", "Manager", "Accountant", "IT Staff", "Employee","HR").default("Employee"),
}).required();

//delete employee
export const deleteEmployee=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();

//get specific employee
export const getEmployeeById=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();

//Departments
//add new department
export const addNewDepartment=joi.object({
    name:joi.string().min(2).max(100).required(),
}).required();

//update department
export const updateDepartment=joi.object({
    id:joi.custom(isValidObjectId).required(),
    name:joi.string().min(2).max(100).required(),
}).required();

//delete department
export const deleteDepartment=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();


//leaves::
//update leave
export const updateLeaveSchema=joi.object({
    id:joi.custom(isValidObjectId).required(),
    status:joi.string().valid("pending", "approved", "rejected").required()
}).required();

//delete leave
export const deleteLeaveSchema=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();

//payrolls::
//generate payroll for an employee
export const generatePayrollSchema=joi.object({
    id:joi.custom(isValidObjectId).required(),
    baseSalary:joi.number().min(0).required(),
    bonuses:joi.number().min(0).default(0),
    deductions:joi.number().min(0).default(0),
    payDate:joi.date().required(),
    overtimeHours:joi.number().min(0).default(0),
    overtimeRate:joi.number().min(0).default(0), // per hour extra rate
    benefits:joi.number().min(0).default(0), // allowances, insurance contributions etc.
    taxes:joi.number().min(0).default(0), // auto-calculated or entered
}).required();

//get payroll by id
export const getPayrollByIdSchema=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();

//update payroll
export const updatePayrollSchema=joi.object({
    id:joi.custom(isValidObjectId).optional(),
    baseSalary:joi.number().min(0).optional(),
    bonuses:joi.number().min(0).default(0),
    deductions:joi.number().min(0).default(0),
    payDate:joi.date().optional(),
    overtimeHours:joi.number().min(0).default(0),
    overtimeRate:joi.number().min(0).default(0), // per hour extra rate
    benefits:joi.number().min(0).default(0), // allowances, insurance contributions etc.
    taxes:joi.number().min(0).default(0), // auto-calculated or entered
    status:joi.string().valid("pending", "paid").default("pending"),
}).required();

export const deletePayrollSchema=joi.object({
    id:joi.custom(isValidObjectId).required()
}).required();