"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePayroll = exports.getPayslip = exports.updatePayroll = exports.getPayroll = exports.generatePayslip = exports.deleteLeave = exports.updateLeaveStatus = exports.getAllLeaves = exports.getAllDepartments = exports.deleteDepartment = exports.updateDepartment = exports.addNewDepartment = exports.getEmployeeById = exports.getAllEmployees = exports.deleteEmployee = exports.updateEmployee = exports.addNewEmployee = void 0;

var _bcrypt = require("bcrypt");

var _departmentModel = require("../../../DB/models/departmentModel.js");

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _leavesModel = require("../../../DB/models/leavesModel.js");

var _payrollModel = require("../../../DB/models/payrollModel.js");

var _asyncHandler = require("../../utils/asyncHandler.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Employees
//add new employee
var addNewEmployee = (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
  var department, passwordHashed, employee;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: req.body.department
          }));

        case 2:
          department = _context.sent;

          if (department) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new Error("Department ".concat(req.body.department, " not found"), {
            cause: 404
          })));

        case 5:
          passwordHashed = (0, _bcrypt.hashSync)("".concat(req.body.firstName, "@1234"), +process.env.SALT_ROUNDS);
          _context.next = 8;
          return regeneratorRuntime.awrap(_employeeModel.Employee.create(_objectSpread({}, req.body, {
            department: department._id,
            password: passwordHashed
          })));

        case 8:
          employee = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "Employee added successfully",
            data: employee
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}); //update employee

exports.addNewEmployee = addNewEmployee;
var updateEmployee = (0, _asyncHandler.asyncHandler)(function _callee2(req, res, next) {
  var id, department, employee;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: req.body.department
          }));

        case 3:
          department = _context2.sent;

          if (department) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new Error("Department ".concat(req.body.department, " not found"), {
            cause: 404
          })));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findByIdAndUpdate(id, _objectSpread({}, req.body, {
            department: department._id
          }), {
            "new": true
          }));

        case 8:
          employee = _context2.sent;

          if (employee) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 11:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //delete employee

exports.updateEmployee = updateEmployee;
var deleteEmployee = (0, _asyncHandler.asyncHandler)(function _callee3(req, res, next) {
  var id, employee;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findByIdAndDelete(id));

        case 3:
          employee = _context3.sent;

          if (employee) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
          }));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //get all employees

exports.deleteEmployee = deleteEmployee;
var getAllEmployees = (0, _asyncHandler.asyncHandler)(function _callee4(req, res, next) {
  var page, limit, skip, employees, totalEmployees;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find().skip(skip).limit(limit));

        case 5:
          employees = _context4.sent;

          if (!(employees.length === 0)) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(new Error("No employees found", {
            cause: 404
          })));

        case 8:
          totalEmployees = employees.length;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            data: employees,
            totalEmployees: totalEmployees
          }));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //get employee by id

exports.getAllEmployees = getAllEmployees;
var getEmployeeById = (0, _asyncHandler.asyncHandler)(function _callee5(req, res, next) {
  var id, employee;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(id));

        case 3:
          employee = _context5.sent;

          if (employee) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            data: employee
          }));

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Departments
//add new department

exports.getEmployeeById = getEmployeeById;
var addNewDepartment = (0, _asyncHandler.asyncHandler)(function _callee6(req, res, next) {
  var existingDepartment, department;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: req.body.name
          }));

        case 2:
          existingDepartment = _context6.sent;

          if (!existingDepartment) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new Error("Department already exists", {
            cause: 409
          })));

        case 5:
          _context6.next = 7;
          return regeneratorRuntime.awrap(_departmentModel.Department.create({
            name: req.body.name
          }));

        case 7:
          department = _context6.sent;
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            message: "Department added successfully",
            data: department
          }));

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //update department

exports.addNewDepartment = addNewDepartment;
var updateDepartment = (0, _asyncHandler.asyncHandler)(function _callee7(req, res, next) {
  var id, newName, department;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          newName = req.body.name; // Find the department

          _context7.next = 4;
          return regeneratorRuntime.awrap(_departmentModel.Department.findById(id));

        case 4:
          department = _context7.sent;

          if (department) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", next(new Error("No department with this id", {
            cause: 404
          })));

        case 7:
          // Update department name
          department.name = newName;
          _context7.next = 10;
          return regeneratorRuntime.awrap(department.save());

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap(_employeeModel.Employee.updateMany({
            department: department._id
          }, {
            department: department._id
          } // ObjectId stays the same, name is in Department collection
          ));

        case 12:
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            message: "Department updated successfully",
            data: department
          }));

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //delete department

exports.updateDepartment = updateDepartment;
var deleteDepartment = (0, _asyncHandler.asyncHandler)(function _callee8(req, res, next) {
  var id, department;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id; // Find the department

          _context8.next = 3;
          return regeneratorRuntime.awrap(_departmentModel.Department.findById(id));

        case 3:
          department = _context8.sent;

          if (department) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", next(new Error("No department with this id", {
            cause: 404
          })));

        case 6:
          _context8.next = 8;
          return regeneratorRuntime.awrap(_employeeModel.Employee.deleteMany({
            department: department._id
          }));

        case 8:
          _context8.next = 10;
          return regeneratorRuntime.awrap(department.deleteOne());

        case 10:
          return _context8.abrupt("return", res.status(200).json({
            success: true,
            message: "Department deleted successfully"
          }));

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //get all departments

exports.deleteDepartment = deleteDepartment;
var getAllDepartments = (0, _asyncHandler.asyncHandler)(function _callee9(req, res, next) {
  var departments;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.find());

        case 2:
          departments = _context9.sent;

          if (!(departments.length === 0)) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", next(new Error("No departments found", {
            cause: 404
          })));

        case 5:
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            data: departments
          }));

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //Leaves
//get all leaves

exports.getAllDepartments = getAllDepartments;
var getAllLeaves = (0, _asyncHandler.asyncHandler)(function _callee10(req, res, next) {
  var page, limit, skip, leaves;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context10.next = 5;
          return regeneratorRuntime.awrap(_leavesModel.Leave.find().skip(skip).limit(limit).populate('employee', 'firstName lastName email'));

        case 5:
          leaves = _context10.sent;

          if (!(leaves.length === 0)) {
            _context10.next = 8;
            break;
          }

          return _context10.abrupt("return", next(new Error("No leaves found", {
            cause: 404
          })));

        case 8:
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            data: leaves
          }));

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //update leave status

exports.getAllLeaves = getAllLeaves;
var updateLeaveStatus = (0, _asyncHandler.asyncHandler)(function _callee11(req, res, next) {
  var id, status, updatedLeave;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;
          _context11.next = 4;
          return regeneratorRuntime.awrap(_leavesModel.Leave.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": true
          }));

        case 4:
          updatedLeave = _context11.sent;

          if (updatedLeave) {
            _context11.next = 7;
            break;
          }

          return _context11.abrupt("return", next(new Error("No leave with this id", {
            cause: 404
          })));

        case 7:
          return _context11.abrupt("return", res.json({
            success: true,
            message: "Leave status updated successfully",
            data: updatedLeave
          }));

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //delete leave

exports.updateLeaveStatus = updateLeaveStatus;
var deleteLeave = (0, _asyncHandler.asyncHandler)(function _callee12(req, res, next) {
  var id, deletedLeave;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id = req.params.id;
          _context12.next = 3;
          return regeneratorRuntime.awrap(_leavesModel.Leave.findByIdAndDelete(id));

        case 3:
          deletedLeave = _context12.sent;

          if (deletedLeave) {
            _context12.next = 6;
            break;
          }

          return _context12.abrupt("return", next(new Error("No leave with this id", {
            cause: 404
          })));

        case 6:
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            message: "Leave deleted successfully"
          }));

        case 7:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //payrolls::
//generate payslip

exports.deleteLeave = deleteLeave;
var generatePayslip = (0, _asyncHandler.asyncHandler)(function _callee13(req, res, next) {
  var id, employee, _req$body, baseSalary, _req$body$overtimeHou, overtimeHours, _req$body$overtimeRat, overtimeRate, _req$body$bonuses, bonuses, _req$body$deductions, deductions, _req$body$benefits, benefits, _req$body$taxes, taxes, payDate, _req$body$status, status, existingPayslip, netPay, payslip;

  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          id = req.params.id;
          _context13.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(id));

        case 3:
          employee = _context13.sent;

          if (employee) {
            _context13.next = 6;
            break;
          }

          return _context13.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          // extract values from req.body
          _req$body = req.body, baseSalary = _req$body.baseSalary, _req$body$overtimeHou = _req$body.overtimeHours, overtimeHours = _req$body$overtimeHou === void 0 ? 0 : _req$body$overtimeHou, _req$body$overtimeRat = _req$body.overtimeRate, overtimeRate = _req$body$overtimeRat === void 0 ? 0 : _req$body$overtimeRat, _req$body$bonuses = _req$body.bonuses, bonuses = _req$body$bonuses === void 0 ? 0 : _req$body$bonuses, _req$body$deductions = _req$body.deductions, deductions = _req$body$deductions === void 0 ? 0 : _req$body$deductions, _req$body$benefits = _req$body.benefits, benefits = _req$body$benefits === void 0 ? 0 : _req$body$benefits, _req$body$taxes = _req$body.taxes, taxes = _req$body$taxes === void 0 ? 0 : _req$body$taxes, payDate = _req$body.payDate, _req$body$status = _req$body.status, status = _req$body$status === void 0 ? "pending" : _req$body$status;
          _context13.next = 9;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.findOne({
            employee: employee._id,
            payDate: payDate
          }));

        case 9:
          existingPayslip = _context13.sent;

          if (!existingPayslip) {
            _context13.next = 12;
            break;
          }

          return _context13.abrupt("return", next(new Error("Payslip for ".concat(employee.firstName, " ").concat(employee.lastName, " on ").concat(payDate, " already exists"), {
            cause: 409
          })));

        case 12:
          // calculate net pay directly here
          netPay = baseSalary + overtimeHours * overtimeRate + bonuses + benefits - (deductions + taxes); // create payroll with calculated netPay

          _context13.next = 15;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.create({
            employee: employee._id,
            baseSalary: baseSalary,
            overtimeHours: overtimeHours,
            overtimeRate: overtimeRate,
            bonuses: bonuses,
            deductions: deductions,
            benefits: benefits,
            taxes: taxes,
            netPay: netPay,
            // 👈 directly set here
            payDate: payDate,
            status: status
          }));

        case 15:
          payslip = _context13.sent;
          return _context13.abrupt("return", res.status(200).json({
            success: true,
            message: "Payslip generated successfully",
            data: payslip
          }));

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //get all payroll

exports.generatePayslip = generatePayslip;
var getPayroll = (0, _asyncHandler.asyncHandler)(function _callee14(req, res, next) {
  var page, limit, skip, payrolls;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context14.next = 5;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.find().skip(skip).limit(limit).populate('employee', 'firstName lastName email position'));

        case 5:
          payrolls = _context14.sent;

          if (!(payrolls.length === 0)) {
            _context14.next = 8;
            break;
          }

          return _context14.abrupt("return", next(new Error("No payrolls found", {
            cause: 404
          })));

        case 8:
          return _context14.abrupt("return", res.status(200).json({
            success: true,
            data: payrolls
          }));

        case 9:
        case "end":
          return _context14.stop();
      }
    }
  });
}); //update payroll

exports.getPayroll = getPayroll;
var updatePayroll = (0, _asyncHandler.asyncHandler)(function _callee15(req, res, next) {
  var id, _req$body2, baseSalary, _req$body2$overtimeHo, overtimeHours, _req$body2$overtimeRa, overtimeRate, _req$body2$bonuses, bonuses, _req$body2$deductions, deductions, _req$body2$benefits, benefits, _req$body2$taxes, taxes, netPay, updatedPayroll;

  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, baseSalary = _req$body2.baseSalary, _req$body2$overtimeHo = _req$body2.overtimeHours, overtimeHours = _req$body2$overtimeHo === void 0 ? 0 : _req$body2$overtimeHo, _req$body2$overtimeRa = _req$body2.overtimeRate, overtimeRate = _req$body2$overtimeRa === void 0 ? 0 : _req$body2$overtimeRa, _req$body2$bonuses = _req$body2.bonuses, bonuses = _req$body2$bonuses === void 0 ? 0 : _req$body2$bonuses, _req$body2$deductions = _req$body2.deductions, deductions = _req$body2$deductions === void 0 ? 0 : _req$body2$deductions, _req$body2$benefits = _req$body2.benefits, benefits = _req$body2$benefits === void 0 ? 0 : _req$body2$benefits, _req$body2$taxes = _req$body2.taxes, taxes = _req$body2$taxes === void 0 ? 0 : _req$body2$taxes;
          netPay = baseSalary + overtimeHours * overtimeRate + bonuses + benefits - (deductions + taxes);
          _context15.next = 5;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.findByIdAndUpdate(id, _objectSpread({}, req.body, {
            netPay: netPay
          }), {
            "new": true
          }));

        case 5:
          updatedPayroll = _context15.sent;

          if (updatedPayroll) {
            _context15.next = 8;
            break;
          }

          return _context15.abrupt("return", next(new Error("No payroll with this id", {
            cause: 404
          })));

        case 8:
          return _context15.abrupt("return", res.json({
            success: true,
            message: "Payroll updated successfully",
            data: updatedPayroll
          }));

        case 9:
        case "end":
          return _context15.stop();
      }
    }
  });
}); //get specific payslip

exports.updatePayroll = updatePayroll;
var getPayslip = (0, _asyncHandler.asyncHandler)(function _callee16(req, res, next) {
  var id, employeeExists, payrolls;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          id = req.params.id;
          _context16.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(id));

        case 3:
          employeeExists = _context16.sent;

          if (employeeExists) {
            _context16.next = 6;
            break;
          }

          return _context16.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          _context16.next = 8;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.find({
            employee: id
          }).populate('employee', 'firstName lastName email position').sort({
            payDate: -1
          }));

        case 8:
          payrolls = _context16.sent;
          return _context16.abrupt("return", res.status(200).json({
            success: true,
            data: payrolls
          }));

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  });
});
exports.getPayslip = getPayslip;
var deletePayroll = (0, _asyncHandler.asyncHandler)(function _callee17(req, res, next) {
  var id, deletedPayroll;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          id = req.params.id;
          _context17.next = 3;
          return regeneratorRuntime.awrap(_payrollModel.Payroll.findByIdAndDelete(id));

        case 3:
          deletedPayroll = _context17.sent;

          if (deletedPayroll) {
            _context17.next = 6;
            break;
          }

          return _context17.abrupt("return", next(new Error("No payroll with this id", {
            cause: 404
          })));

        case 6:
          return _context17.abrupt("return", res.status(200).json({
            success: true,
            message: "Payroll deleted successfully"
          }));

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  });
});
exports.deletePayroll = deletePayroll;