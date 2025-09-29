"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTicketSchema = exports.updateTicketSchema = exports.deleteProjectSchema = exports.updateProjectSchema = exports.createProjectSchema = exports.getRatingSchema = exports.updateRatingSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _validationMiddleware = require("../../middlewares/validationMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Ratings:
//update rating
var updateRatingSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  efficiency: _joi["default"].number().min(1).max(5).required(),
  performance: _joi["default"].number().min(1).max(5).required(),
  teamwork: _joi["default"].number().min(1).max(5).required(),
  note: _joi["default"].string().min(2).max(500).optional()
}).required(); //get user's rating


exports.updateRatingSchema = updateRatingSchema;

var getRatingSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //Projects:
// Create new project


exports.getRatingSchema = getRatingSchema;

var createProjectSchema = _joi["default"].object({
  name: _joi["default"].string().min(3).max(100).required(),
  description: _joi["default"].string().max(500).required(),
  status: _joi["default"].string().valid("planned", "in_progress", "on_hold", "completed")["default"]("planned"),
  members: _joi["default"].array().items(_joi["default"].custom(_validationMiddleware.isValidObjectId)).min(1).required(),
  notes: _joi["default"].string().max(1000).allow(""),
  startDate: _joi["default"].date().optional(),
  endDate: _joi["default"].date().optional()
}).required(); //update project


exports.createProjectSchema = createProjectSchema;

var updateProjectSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  name: _joi["default"].string().min(3).max(100).optional(),
  description: _joi["default"].string().max(500).optional(),
  status: _joi["default"].string().valid("planned", "in_progress", "on_hold", "completed")["default"]("planned"),
  members: _joi["default"].array().items(_joi["default"].custom(_validationMiddleware.isValidObjectId)).min(1).optional(),
  notes: _joi["default"].string().max(1000).allow(""),
  startDate: _joi["default"].date().optional(),
  endDate: _joi["default"].date().optional()
}).required(); //delete project


exports.updateProjectSchema = updateProjectSchema;

var deleteProjectSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required(); //Tickets:
//update ticket


exports.deleteProjectSchema = deleteProjectSchema;

var updateTicketSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required(),
  status: _joi["default"].string().valid("open", "in_progress", "resolved", "closed").required()
}).required(); //delete ticket


exports.updateTicketSchema = updateTicketSchema;

var deleteTicketSchema = _joi["default"].object({
  id: _joi["default"].custom(_validationMiddleware.isValidObjectId).required()
}).required();

exports.deleteTicketSchema = deleteTicketSchema;