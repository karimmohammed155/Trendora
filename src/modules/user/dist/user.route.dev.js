"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_router = void 0;

var _express = require("express");

var _index = require("../../middlewares/index.js");

var user_controller = _interopRequireWildcard(require("../user/user.controller.js"));

var _auth_middleware = require("../../middlewares/auth_middleware.js");

var _validation_middleware = require("../../middlewares/validation_middleware.js");

var _userSchema = require("./user.schema.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var user_router = (0, _express.Router)();
exports.user_router = user_router;
user_router.post("/log_in", (0, _validation_middleware.validation)(_userSchema.signin_val), (0, _index.error_handle)(user_controller.log_in));
user_router.get("/get_profile", (0, _auth_middleware.auth)(), (0, _index.error_handle)(user_controller.list_profile));
user_router.put("/update", (0, _auth_middleware.auth)(), (0, _validation_middleware.validation)(_userSchema.update_profile_val), (0, _index.error_handle)(user_controller.update_profile));
user_router.post("/forgetPassword", (0, _validation_middleware.validation)(_userSchema.forgetPassword), user_controller.forgetPassword);
user_router.put("/resetPassword", (0, _validation_middleware.validation)(_userSchema.resetPassword), user_controller.resetPassword);