"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var attendanceSchema = new _mongoose["default"].Schema({
  employeeId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  departmentName: {
    type: String
  },
  staffCode: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  day: {
    type: string
  },
  time1: {
    type: String
  },
  time2: {
    type: String
  },
  totalWorkTime: {
    type: Number
  }
});

var _default = _mongoose["default"].model('Attendance', attendanceSchema);

exports["default"] = _default;