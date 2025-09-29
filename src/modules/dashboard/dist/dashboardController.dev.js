"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEmployeesLeaves = exports.addTicket = exports.addLeave = void 0;

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _leavesModel = require("../../../DB/models/leavesModel.js");

var _ticketsModel = require("../../../DB/models/ticketsModel.js");

var _asyncHandler = require("../../utils/asyncHandler.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addLeave = (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
  var employeeId, employee, leave;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          employeeId = req.authEmployee._id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(employeeId));

        case 3:
          employee = _context.sent;

          if (employee) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_leavesModel.Leave.create(_objectSpread({}, req.body, {
            employee: employeeId
          })));

        case 8:
          leave = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "Leave added successfully",
            data: leave
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addLeave = addLeave;
var addTicket = (0, _asyncHandler.asyncHandler)(function _callee2(req, res, next) {
  var employeeId, employee, ticket;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          employeeId = req.authEmployee._id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(employeeId));

        case 3:
          employee = _context2.sent;

          if (employee) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_ticketsModel.Ticket.create(_objectSpread({}, req.body, {
            employee: employeeId
          })));

        case 8:
          ticket = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Ticket added successfully",
            data: ticket
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //get leaves for specific employee

exports.addTicket = addTicket;
var getAllEmployeesLeaves = (0, _asyncHandler.asyncHandler)(function _callee3(req, res, next) {
  var employeeId, department, leaves;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // assuming your auth middleware sets req.user._id
          employeeId = req.authEmployee._id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(employeeId).populate('department'));

        case 3:
          department = _context3.sent;

          if (department) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new Error("No employee with this id", {
            cause: 404
          })));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(_leavesModel.Leave.find({
            employee: employeeId
          }).populate('employee', 'firstName lastName email'));

        case 8:
          leaves = _context3.sent;

          if (!(!leaves || leaves.length === 0)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", next(new Error("No leaves found", {
            cause: 404
          })));

        case 11:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: leaves,
            department: department.department.name
          }));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getAllEmployeesLeaves = getAllEmployeesLeaves;