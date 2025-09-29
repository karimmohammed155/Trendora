"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Employee = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var model = _mongoose["default"].model,
    Schema = _mongoose["default"].Schema;
var EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department"
  },
  hireDate: Date,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  },
  forgetCode: {
    type: String,
    length: 5
  },
  phone: String,
  status: {
    type: String,
    "enum": ["active", "inactive"],
    "default": "active"
  },
  role: {
    type: String,
    "enum": ["Admin", "Manager", "Accountant", "IT Staff", "Employee", "HR"],
    "default": "Employee"
  },
  rating: {
    efficiency: {
      type: Number,
      min: 1,
      max: 5,
      "default": 5
    },
    performance: {
      type: Number,
      min: 1,
      max: 5,
      "default": 5
    },
    teamwork: {
      type: Number,
      min: 1,
      max: 5,
      "default": 5
    },
    average: {
      type: Number,
      "default": 5
    }
  },
  note: {
    type: String,
    min: 2,
    max: 500,
    "default": "No notes"
  },
  address: {
    type: String,
    min: 5,
    max: 200
  },
  submittedDocuments: {
    type: [String],
    // Array of document names or paths
    "default": []
  },
  pendingDocuments: {
    type: [String],
    "default": []
  }
}, {
  timestamps: true,
  versionKey: false
});
var Employee = model("Employee", EmployeeSchema);
exports.Employee = Employee;