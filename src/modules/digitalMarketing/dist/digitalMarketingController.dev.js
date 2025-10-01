"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProject = exports.getAllProjects = exports.updateProject = exports.createProject = exports.getAllDigitalMarketingEmployees = void 0;

var _departmentModel = require("../../../DB/models/departmentModel.js");

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _projectsModel = require("../../../DB/models/projectsModel.js");

var _asyncHandler = require("../../utils/asyncHandler.js");

//get all employees
var getAllDigitalMarketingEmployees = (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
  var department, employees;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: "Digital Marketing"
          }));

        case 2:
          department = _context.sent;

          if (department) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new Error("Digital Marketing Department not found", {
            cause: 404
          })));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            department: department
          }).select("firstName lastName email position rating note"));

        case 7:
          employees = _context.sent;

          if (!(employees.length === 0)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", next(new Error("No employees found in Digital Marketing department", {
            cause: 404
          })));

        case 10:
          res.status(200).json({
            success: true,
            data: employees,
            totalEmployees: employees.length
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}); //projects
//  Create new project

exports.getAllDigitalMarketingEmployees = getAllDigitalMarketingEmployees;
var createProject = (0, _asyncHandler.asyncHandler)(function _callee2(req, res, next) {
  var _req$body, name, description, status, members, notes, startDate, endDate, existingMembers, department, newProject;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, status = _req$body.status, members = _req$body.members, notes = _req$body.notes, startDate = _req$body.startDate, endDate = _req$body.endDate; // Validate members exist

          _context2.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            _id: {
              $in: members
            }
          }));

        case 3:
          existingMembers = _context2.sent;

          if (!(existingMembers.length !== members.length)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new Error("One or more members do not exist", {
            cause: 400
          })));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: "Digital Marketing"
          }));

        case 8:
          department = _context2.sent;

          if (department) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", next(new Error("Digital Marketing Department not found", {
            cause: 404
          })));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(_projectsModel.Project.create({
            name: name,
            description: description,
            status: status,
            members: members,
            notes: notes,
            startDate: startDate,
            endDate: endDate,
            department: department
          }));

        case 13:
          newProject = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Project created successfully",
            data: newProject
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //update project

exports.createProject = createProject;
var updateProject = (0, _asyncHandler.asyncHandler)(function _callee3(req, res, next) {
  var id, _req$body2, name, description, status, members, notes, startDate, endDate, membersExit, updatedProject;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, status = _req$body2.status, members = _req$body2.members, notes = _req$body2.notes, startDate = _req$body2.startDate, endDate = _req$body2.endDate;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            _id: {
              $in: members
            }
          }));

        case 4:
          membersExit = _context3.sent;

          if (!(membersExit.length !== members.length)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next(new Error("One or more members do not exist", {
            cause: 400
          })));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(_projectsModel.Project.findByIdAndUpdate(id, {
            name: name,
            description: description,
            status: status,
            members: members,
            notes: notes,
            startDate: startDate,
            endDate: endDate
          }, {
            "new": true
          }));

        case 9:
          updatedProject = _context3.sent;

          if (updatedProject) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", next(new Error("No project with this id", {
            cause: 404
          })));

        case 12:
          return _context3.abrupt("return", res.json({
            success: true,
            message: "Project updated successfully",
            data: updatedProject
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // GET /api/it/projects → Get all projects

exports.updateProject = updateProject;
var getAllProjects = (0, _asyncHandler.asyncHandler)(function _callee4(req, res, next) {
  var page, limit, skip, department, projects;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          skip = (page - 1) * limit;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: "Digital Marketing"
          }));

        case 5:
          department = _context4.sent;

          if (department) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(new Error("Digital Marketing Department not found", {
            cause: 404
          })));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(_projectsModel.Project.find({
            department: department
          }).skip(skip).limit(limit).populate('members', 'firstName lastName email position startDate endDate'));

        case 10:
          projects = _context4.sent;

          if (!(projects.length === 0)) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", next(new Error("No projects found", {
            cause: 404
          })));

        case 13:
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            data: projects
          }));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // DELETE /api/it/projects/:id → Delete project

exports.getAllProjects = getAllProjects;
var deleteProject = (0, _asyncHandler.asyncHandler)(function _callee5(req, res, next) {
  var id, deletedProject;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_projectsModel.Project.findByIdAndDelete(id));

        case 3:
          deletedProject = _context5.sent;

          if (deletedProject) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", next(new Error("No project with this id", {
            cause: 404
          })));

        case 6:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            message: "Project deleted successfully"
          }));

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.deleteProject = deleteProject;