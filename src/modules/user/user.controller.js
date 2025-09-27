import { Error_handler_class } from "../../../../nettune/src/utils/index.js";
import { user } from "../../../Database/models/index.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
// log in api
export const log_in = async (req, res, next) => {
  const { email, password } = req.body;
  const is_user_exists = await user.findOne({ email });
  if (!is_user_exists) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const pass_check = compareSync(password, is_user_exists.password);
  if (!pass_check) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const token = jwt.sign(
    { user_id: is_user_exists._id },
    process.env.SIGNATURE,
    {
      expiresIn: "30d",
    }
  );
  is_user_exists.subscription_status = "active";
  await is_user_exists.save();
  res
    .status(200)
    .json({ message: "user logged in successfully", token: token });
};
// get profile api
export const list_profile = async (req, res, next) => {
  const { _id } = req.authUser;
  const find_user = await user.findById(_id).select("-password");
  if (!find_user) {
    next(new Error_handler_class("user not found", 404, "list profile api"));
  }
  res.status(200).json(find_user);
};
// update profile api
export const update_profile = async (req, res, next) => {
  const { _id } = req.authUser;
  const { username, password } = req.body;
  const user_exists = await user.findById(_id);
  if (!user_exists) {
    next(new Error_handler_class("user not found", 404, "list profile api"));
  }
  if (username) {
    user_exists.username = username;
  }
  if (password) {
    const hashed_password = hashSync(password, +process.env.SALT_ROUNDS);
    user_exists.password = hashed_password;
  }
  await user_exists.save();
  res.status(200).json({
    message: "user updated successfully",
  });
};
