"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.forgetPassword = exports.log_in = void 0;

var _index = require("../../utils/index.js");

var _employeeModel = require("../../../DB/models/employeeModel.js");

var _bcrypt = _interopRequireWildcard(require("bcrypt"));

var _randomstring = _interopRequireDefault(require("randomstring"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _sendEmail = require("../../utils/sendEmail.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// log in api
var log_in = function log_in(req, res, next) {
  var _req$body, email, password, is_user_exists, pass_check, token;

  return regeneratorRuntime.async(function log_in$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findOne({
            email: email
          }));

        case 3:
          is_user_exists = _context.sent;

          if (is_user_exists) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", next(new _index.Error_handler_class("invalid credentials", 400, "login api")));

        case 6:
          pass_check = (0, _bcrypt.compareSync)(password, is_user_exists.password);

          if (pass_check) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", next(new _index.Error_handler_class("invalid credentials", 400, "login api")));

        case 9:
          token = _jsonwebtoken["default"].sign({
            user_id: is_user_exists._id,
            role: is_user_exists.role
          }, process.env.SIGNATURE, {
            expiresIn: "30d"
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(is_user_exists.save());

        case 12:
          res.status(200).json({
            message: "user logged in successfully",
            token: token
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}; // get profile api
// export const list_profile = async (req, res, next) => {
//   const { _id } = req.authUser;
//   const find_user = await user.findById(_id).select("-password");
//   if (!find_user) {
//     next(new Error_handler_class("user not found", 404, "list profile api"));
//   }
//   res.status(200).json(find_user);
// };
// // update profile api
// export const update_profile = async (req, res, next) => {
//   const { _id } = req.authUser;
//   const { username, password } = req.body;
//   const user_exists = await user.findById(_id);
//   if (!user_exists) {
//     next(new Error_handler_class("user not found", 404, "list profile api"));
//   }
//   if (username) {
//     user_exists.username = username;
//   }
//   if (password) {
//     const hashed_password = hashSync(password, +process.env.SALT_ROUNDS);
//     user_exists.password = hashed_password;
//   }
//   await user_exists.save();
//   res.status(200).json({
//     message: "user updated successfully",
//   });
// };


exports.log_in = log_in;
var forgetPassword = (0, _index.asyncHandler)(function _callee(req, res, next) {
  var email, user, forgetCode, messageSent;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new Error("User not found!", {
            cause: 404
          })));

        case 6:
          forgetCode = _randomstring["default"].generate({
            length: 5,
            charset: "numeric"
          });
          user.forgetCode = forgetCode;
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap((0, _sendEmail.sendEmail)({
            to: email,
            subject: "Forget password",
            html: "<div style=\"font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);\">\n  <h2 style=\"text-align: center; color: #2c3e50;\">\uD83D\uDD10 Password Reset Request</h2>\n  <p style=\"font-size: 16px; color: #555; text-align: center;\">\n    Use the following verification code to reset your password. This code is valid for a limited time:\n  </p>\n  <div style=\"margin: 30px auto; background-color: #f0f4f8; padding: 20px 30px; text-align: center; border-radius: 8px; border: 1px dashed #ccc; width: fit-content;\">\n    <span style=\"font-size: 32px; color: #007bff; font-weight: bold; letter-spacing: 4px;\">".concat(forgetCode, "</span>\n  </div>\n  <p style=\"text-align: center; font-size: 14px; color: #999;\">\n    If you didn\u2019t request a password reset, you can safely ignore this email.\n  </p>\n  <p style=\"text-align: center; font-size: 14px; color: #ccc; margin-top: 30px;\">\u2014 Support Team</p>\n</div>")
          }));

        case 12:
          messageSent = _context2.sent;

          if (messageSent) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", next(new Error("Something went wrong!")));

        case 15:
          return _context2.abrupt("return", res.json({
            success: true,
            message: "Forget code sent to user successfully",
            forgetCode: forgetCode
          }));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.forgetPassword = forgetPassword;
var resetPassword = (0, _index.asyncHandler)(function _callee2(req, res, next) {
  var _req$body2, email, password, forgetCode, user;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, forgetCode = _req$body2.forgetCode;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_employeeModel.Employee.findOne({
            email: email
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new Error("User not found!", {
            cause: 404
          })));

        case 6:
          if (!(forgetCode !== user.forgetCode)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", next(new Error("Invalid code!", {
            cause: 406
          })));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, parseInt(process.env.SALT_ROUND)));

        case 10:
          user.password = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          return _context3.abrupt("return", res.json({
            success: true,
            message: "Try to login now :)"
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.resetPassword = resetPassword;