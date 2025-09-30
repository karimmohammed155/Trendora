"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTickets = exports.deleteTicket = exports.updateTicketStatus = exports.deleteProject = exports.getAllProjects = exports.updateProject = exports.createProject = exports.getRating = exports.updateRating = exports.getAllEmployees = void 0;

var _departmentModel = require("../../../DB/models/departmentModel.js");

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _projectsModel = require("../../../DB/models/projectsModel.js");

var _ticketsModel = require("../../../DB/models/ticketsModel.js");

var _asyncHandler = require("../../utils/asyncHandler.js");

// GET /api/it/employees → Get all employees
var getAllEmployees = (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
  var department, employees, totalEmployees;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_departmentModel.Department.findOne({
            name: "IT"
          }));

        case 2:
          department = _context.sent;

          if (department) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new Error("IT Department not found", {
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

          return _context.abrupt("return", next(new Error("No employees found in IT department", {
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
}); // Ratings
//update rating

exports.getAllEmployees = getAllEmployees;
var updateRating = (0, _asyncHandler.asyncHandler)(function _callee2(req, res, next) {
  var _req$body, efficiency, performance, teamwork, note, id, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, efficiency = _req$body.efficiency, performance = _req$body.performance, teamwork = _req$body.teamwork, note = _req$body.note;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(id));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next(new Error("No user with this id", {
            cause: 404
          })));

        case 7:
          user.rating = {
            efficiency: efficiency,
            performance: performance,
            teamwork: teamwork
          };

          if (note) {
            user.note = note;
          }

          user.rating.average = ((efficiency + performance + teamwork) / 3).toFixed(2);
          _context2.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            message: "Rating added successfully",
            userRating: user.rating
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // GET rating

exports.updateRating = updateRating;
var getRating = (0, _asyncHandler.asyncHandler)(function _callee3(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findById(id).select("name rating note"));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new Error("No user with this id", {
            cause: 404
          })));

        case 6:
          return _context3.abrupt("return", res.status(200).json({
            status: "success",
            data: user
          }));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 2. Projects
//  Create new project

exports.getRating = getRating;
var createProject = (0, _asyncHandler.asyncHandler)(function _callee4(req, res, next) {
  var _req$body2, name, description, status, members, notes, startDate, endDate, existingMembers, newProject;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, status = _req$body2.status, members = _req$body2.members, notes = _req$body2.notes, startDate = _req$body2.startDate, endDate = _req$body2.endDate; // Validate members exist

          _context4.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            _id: {
              $in: members
            }
          }));

        case 3:
          existingMembers = _context4.sent;

          if (!(existingMembers.length !== members.length)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next(new Error("One or more members do not exist", {
            cause: 400
          })));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(_projectsModel.Project.create({
            name: name,
            description: description,
            status: status,
            members: members,
            notes: notes,
            startDate: startDate,
            endDate: endDate,
            department: "IT"
          }));

        case 8:
          newProject = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "Project created successfully",
            data: newProject
          }));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //update project

exports.createProject = createProject;
var updateProject = (0, _asyncHandler.asyncHandler)(function _callee5(req, res, next) {
  var id, _req$body3, name, description, status, members, notes, startDate, endDate, membersExit, updatedProject;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, name = _req$body3.name, description = _req$body3.description, status = _req$body3.status, members = _req$body3.members, notes = _req$body3.notes, startDate = _req$body3.startDate, endDate = _req$body3.endDate;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_employeeModel.Employee.find({
            _id: {
              $in: members
            }
          }));

        case 4:
          membersExit = _context5.sent;

          if (!(membersExit.length !== members.length)) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", next(new Error("One or more members do not exist", {
            cause: 400
          })));

        case 7:
          _context5.next = 9;
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
          updatedProject = _context5.sent;

          if (updatedProject) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", next(new Error("No project with this id", {
            cause: 404
          })));

        case 12:
          return _context5.abrupt("return", res.json({
            success: true,
            message: "Project updated successfully",
            data: updatedProject
          }));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // GET /api/it/projects → Get all projects

exports.updateProject = updateProject;
var getAllProjects = (0, _asyncHandler.asyncHandler)(function _callee6(req, res, next) {
  var projects;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_projectsModel.Project.find({
            department: "IT"
          }).populate('members', 'firstName lastName email position startDate endDate'));

        case 2:
          projects = _context6.sent;

          if (!(projects.length === 0)) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new Error("No projects found", {
            cause: 404
          })));

        case 5:
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            data: projects
          }));

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // DELETE /api/it/projects/:id → Delete project

exports.getAllProjects = getAllProjects;
var deleteProject = (0, _asyncHandler.asyncHandler)(function _callee7(req, res, next) {
  var id, deletedProject;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_projectsModel.Project.findByIdAndDelete(id));

        case 3:
          deletedProject = _context7.sent;

          if (deletedProject) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next(new Error("No project with this id", {
            cause: 404
          })));

        case 6:
          return _context7.abrupt("return", res.status(200).json({
            success: true,
            message: "Project deleted successfully"
          }));

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // 3. Tickets 
//update ticket status

exports.deleteProject = deleteProject;
var updateTicketStatus = (0, _asyncHandler.asyncHandler)(function _callee8(req, res, next) {
  var id, status, updatedTicket;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_ticketsModel.Ticket.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": true
          }));

        case 4:
          updatedTicket = _context8.sent;

          if (updatedTicket) {
            _context8.next = 7;
            break;
          }

          return _context8.abrupt("return", next(new Error("No ticket with this id", {
            cause: 404
          })));

        case 7:
          return _context8.abrupt("return", res.json({
            success: true,
            message: "Ticket status updated successfully",
            data: updatedTicket
          }));

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //delete ticket

exports.updateTicketStatus = updateTicketStatus;
var deleteTicket = (0, _asyncHandler.asyncHandler)(function _callee9(req, res, next) {
  var id, deletedTicket;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.next = 3;
          return regeneratorRuntime.awrap(_ticketsModel.Ticket.findByIdAndDelete(id));

        case 3:
          deletedTicket = _context9.sent;

          if (deletedTicket) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return", next(new Error("No ticket with this id", {
            cause: 404
          })));

        case 6:
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            message: "Ticket deleted successfully"
          }));

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //get all tickets assigned to IT department

exports.deleteTicket = deleteTicket;
var getAllTickets = (0, _asyncHandler.asyncHandler)(function _callee10(req, res, next) {
  var tickets;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(_ticketsModel.Ticket.find().populate('employee', 'firstName lastName email'));

        case 2:
          tickets = _context10.sent;

          if (!(tickets.length === 0)) {
            _context10.next = 5;
            break;
          }

          return _context10.abrupt("return", next(new Error("No tickets found", {
            cause: 404
          })));

        case 5:
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            data: tickets,
            crreatedAt: new Date()
          }));

        case 6:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.getAllTickets = getAllTickets;