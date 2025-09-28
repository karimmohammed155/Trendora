"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Error_handler_class = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Error_handler_class = function Error_handler_class(message, status_code, stack, name, data) {
  _classCallCheck(this, Error_handler_class);

  this.message = message;
  this.status_code = status_code;
  this.stack = stack ? stack : null;
  this.name = name ? name : "error";
  this.data = data ? data : null;
};

exports.Error_handler_class = Error_handler_class;