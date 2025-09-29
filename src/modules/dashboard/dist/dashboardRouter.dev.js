"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authorizationMiddleware = require("../../middlewares/authorization.middleware.js");

var _dashboardSchema = require("./dashboardSchema.js");

var _validationMiddleware = require("../../middlewares/validationMiddleware.js");

var _dashboardController = require("./dashboardController.js");

var _auth_middleware = require("../../middlewares/auth_middleware.js");

var router = (0, _express.Router)(); //Add leave

router.post('/leaves', (0, _auth_middleware.auth)(), (0, _validationMiddleware.validation)(_dashboardSchema.addLeaveSchema), _dashboardController.addLeave); //Add ticket

router.post('/tickets', (0, _auth_middleware.auth)(), (0, _validationMiddleware.validation)(_dashboardSchema.addTicketSchema), _dashboardController.addTicket);
router.get('/leaves', (0, _auth_middleware.auth)(), _dashboardController.getAllEmployeesLeaves);
var _default = router;
exports["default"] = _default;