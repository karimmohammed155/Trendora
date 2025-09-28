"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;

var _mongoose = require("mongoose");

var tokenSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: String,
    "default": "user"
  },
  //Need to ask about
  isValid: {
    type: Boolean,
    "default": true
  },
  expiredAt: {
    type: String
  }
}, {
  timestamps: true
});
var Token = (0, _mongoose.model)("Token", tokenSchema);
exports.Token = Token;