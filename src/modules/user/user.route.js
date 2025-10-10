import { Router } from "express";
import { auth, validation, error_handle } from "../../middlewares/index.js";
import * as user_controller from "../user/user.controller.js";
import {
  forgetPassword,
  resetPassword,
  signin_val,
  update_profile_val,
} from "./user.schema.js";

const user_router = Router();
user_router.post(
  "/log_in",
  validation(signin_val),
  error_handle(user_controller.log_in)
);
user_router.get(
  "/get_profile",
  auth(),
  error_handle(user_controller.list_profile)
);
user_router.post(
  "/forgetPassword",
  validation(forgetPassword),
  user_controller.forgetPassword
);

user_router.put(
  "/resetPassword",
  validation(resetPassword),
  user_controller.resetPassword
);

export { user_router };
