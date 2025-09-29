"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePayrollSchema = exports.updatePayrollSchema = exports.getPayrollByIdSchema = exports.generatePayrollSchema = exports.deleteLeaveSchema = exports.updateLeaveSchema = exports.deleteDepartment = exports.updateDepartment = exports.addNewDepartment = exports.getEmployeeById = exports.deleteEmployee = exports.updateEmployee = exports.addNewEmployee = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _validationMiddleware = require("../../middlewares/validationMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Employees:
//add new employee
var addNewEmployee = _joi["default"].object({
  firstName: _joi["default"].string().min(3).max(50).required(),
  lastName: _joi["default"].string().min(3).max(50).required(),
  email: _joi["default"].string().email().required(),
  department: _joi["default"].string().valid("HR", "Accounting", "IT", "Administration", "Operation", "Digital Marketing", "Sales").required(),
  hireDate: _joi["default"].date().required(),
  phone: _joi["default"].string().pattern(/^[0-9]{10,15}$/).required(),
  status: _joi["default"].string().valid("active", "inactive")["default"]("active"),
  role: _joi["default"].string().valid("Admin", "Manager", "Accountant", "IT Staff", "Employee", "HR")["default"]("Employee"),
  address: _joi["default"].string().min(5).max(200).optional(),
  submittedDocuments: _joi["default"].array().items(_joi["default"].string()).optional(),
  pendingDocuments: _joi["default"].array().items(_joi["default"].string()).optional()
}).required(); //update employee


exports.addNewEmployee = addNewEmployee;

var updateEmployee = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  firstName: _joi["default"].string().min(3).max(50).optional(),
  lastName: _joi["default"].string().min(3).max(50).optional(),
  email: _joi["default"].string().email().optional(),
  department: _joi["default"].string().valid("HR", "Accounting", "IT", "Administration", "Operation").optional(),
  hireDate: _joi["default"].date().optional(),
  phone: _joi["default"].string().pattern(/^[0-9]{10,15}$/).optional(),
  status: _joi["default"].string().valid("active", "inactive")["default"]("active"),
  role: _joi["default"].string().valid("Admin", "Manager", "Accountant", "IT Staff", "Employee", "HR")["default"]("Employee"),
  address: _joi["default"].string().min(5).max(200).optional(),
  submittedDocuments: _joi["default"].array().items(_joi["default"].string()).optional(),
  pendingDocuments: _joi["default"].array().items(_joi["default"].string()).optional()
}).required(); //delete employee


exports.updateEmployee = updateEmployee;

var deleteEmployee = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //get specific employee


exports.deleteEmployee = deleteEmployee;

var getEmployeeById = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //Departments
//add new department


exports.getEmployeeById = getEmployeeById;

var addNewDepartment = _joi["default"].object({
  name: _joi["default"].string().min(2).max(100).required()
}).required(); //update department


exports.addNewDepartment = addNewDepartment;

var updateDepartment = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  name: _joi["default"].string().min(2).max(100).required()
}).required(); //delete department


exports.updateDepartment = updateDepartment;

var deleteDepartment = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //leaves::
//update leave


exports.deleteDepartment = deleteDepartment;

var updateLeaveSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  status: _joi["default"].string().valid("pending", "approved", "rejected").required()
}).required(); //delete leave


exports.updateLeaveSchema = updateLeaveSchema;

var deleteLeaveSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //payrolls::
//generate payroll for an employee


exports.deleteLeaveSchema = deleteLeaveSchema;

var generatePayrollSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  baseSalary: _joi["default"].number().min(0).required(),
  bonuses: _joi["default"].number().min(0)["default"](0),
  deductions: _joi["default"].number().min(0)["default"](0),
  payDate: _joi["default"].date().required(),
  overtimeHours: _joi["default"].number().min(0)["default"](0),
  overtimeRate: _joi["default"].number().min(0)["default"](0),
  // per hour extra rate
  benefits: _joi["default"].number().min(0)["default"](0),
  // allowances, insurance contributions etc.
  taxes: _joi["default"].number().min(0)["default"](0) // auto-calculated or entered

}).required(); //get payroll by id


exports.generatePayrollSchema = generatePayrollSchema;

var getPayrollByIdSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //update payroll


exports.getPayrollByIdSchema = getPayrollByIdSchema;

var updatePayrollSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).optional(),
  baseSalary: _joi["default"].number().min(0).optional(),
  bonuses: _joi["default"].number().min(0)["default"](0),
  deductions: _joi["default"].number().min(0)["default"](0),
  payDate: _joi["default"].date().optional(),
  overtimeHours: _joi["default"].number().min(0)["default"](0),
  overtimeRate: _joi["default"].number().min(0)["default"](0),
  // per hour extra rate
  benefits: _joi["default"].number().min(0)["default"](0),
  // allowances, insurance contributions etc.
  taxes: _joi["default"].number().min(0)["default"](0),
  // auto-calculated or entered
  status: _joi["default"].string().valid("pending", "paid")["default"]("pending")
}).required();

exports.updatePayrollSchema = updatePayrollSchema;

var deletePayrollSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required();

exports.deletePayrollSchema = deletePayrollSchema;