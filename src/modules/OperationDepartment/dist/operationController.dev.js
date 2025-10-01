"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCampaign = exports.updateCampaign = exports.getAllCampaigns = exports.addCampaign = exports.getAllOperationEmployees = void 0;

var _campaignModel = require("../../../DB/models/campaignModel.js");

var _departmentModel = require("../../../DB/models/departmentModel.js");

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _asyncHandler = require("../../utils/asyncHandler.js");

//get all operation employees
var getAllOperationEmployees = (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
  var department, employees, totalEmployees;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: "Operation"
          }));

        case 2:
          department = _context.sent;

          if (department) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new Error("Operation Department not found", {
            cause: 404
          })));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            department: department._id
          }).select("firstName lastName email position rating note"));

        case 7:
          employees = _context.sent;

          if (!(employees.length === 0)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", next(new Error("No employees found in Operation department", {
            cause: 404
          })));

        case 10:
          totalEmployees = employees.length;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            data: employees,
            totalEmployees: totalEmployees
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}); //campaigns
//add campaign

exports.getAllOperationEmployees = getAllOperationEmployees;
var addCampaign = (0, _asyncHandler.asyncHandler)(function _callee2(req, res, next) {
  var _req$body, name, description, startDate, endDate, status, notes, newCampaign;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, startDate = _req$body.startDate, endDate = _req$body.endDate, status = _req$body.status, notes = _req$body.notes;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_campaignModel.Campaign.create({
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            notes: notes
          }));

        case 3:
          newCampaign = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Campaign added successfully",
            data: newCampaign
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //get all campaigns

exports.addCampaign = addCampaign;
var getAllCampaigns = (0, _asyncHandler.asyncHandler)(function _callee3(req, res, next) {
  var page, limit, skip, campaigns;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context3.next = 5;
          return regeneratorRuntime.awrap(_campaignModel.Campaign.find().skip(skip).limit(limit));

        case 5:
          campaigns = _context3.sent;

          if (!(campaigns.length === 0)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", next(new Error("No campaigns found", {
            cause: 404
          })));

        case 8:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            data: campaigns
          }));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //update campaign

exports.getAllCampaigns = getAllCampaigns;
var updateCampaign = (0, _asyncHandler.asyncHandler)(function _callee4(req, res, next) {
  var id, _req$body2, name, description, startDate, endDate, status, notes, updatedCampaign;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, startDate = _req$body2.startDate, endDate = _req$body2.endDate, status = _req$body2.status, notes = _req$body2.notes;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_campaignModel.Campaign.findByIdAndUpdate(id, {
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            notes: notes
          }, {
            "new": true
          }));

        case 4:
          updatedCampaign = _context4.sent;

          if (updatedCampaign) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new Error("No campaign with this id", {
            cause: 404
          })));

        case 7:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "Campaign updated successfully",
            data: updatedCampaign
          }));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //delete campaign

exports.updateCampaign = updateCampaign;
var deleteCampaign = (0, _asyncHandler.asyncHandler)(function _callee5(req, res, next) {
  var id, deletedCampaign;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_campaignModel.Campaign.findByIdAndDelete(id));

        case 3:
          deletedCampaign = _context5.sent;

          if (deletedCampaign) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new Error("No campaign with this id", {
            cause: 404
          })));

        case 6:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            message: "Campaign deleted successfully"
          }));

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteCampaign = deleteCampaign;