"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _employeeModel = require("../../DB/models/employeeModel.js");

var _tokenModel = require("../../DB/models/tokenModel.js");

var _asyncHandler = require("../utils/asyncHandler.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var auth = function auth() {
  return (0, _asyncHandler.asyncHandler)(function _callee(req, res, next) {
    var tokenHeader, token, payload, tokenDB, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenHeader = req.headers["token"];

            if (!(!tokenHeader || !tokenHeader.startsWith(process.env.BEARER))) {
              _context.next = 3;
              break;
            }

            throw new Error("Valid token is required!");

          case 3:
            token = tokenHeader.split(process.env.BEARER)[1];
            _context.prev = 4;
            payload = _jsonwebtoken["default"].verify(token, process.env.SIGNATURE);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](4);
            throw new Error("Invalid token");

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(_tokenModel.Token.findOne({
              token: token,
              isValid: true
            }));

          case 13:
            tokenDB = _context.sent;

            if (tokenDB) {
              _context.next = 16;
              break;
            }

            throw new Error("Token invalid!");

          case 16:
            _context.next = 18;
            return regeneratorRuntime.awrap(_employeeModel.Employee.findById(payload.id).select("-password"));

          case 18:
            user = _context.sent;

            if (user) {
              _context.next = 21;
              break;
            }

            throw new Error("User not found!");

          case 21:
            req.authEmployee = user;
            next();

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 8]]);
  });
};

exports.auth = auth;