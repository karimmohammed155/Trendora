import { asyncHandler, Error_handler_class } from "../../utils/index.js";
import { Employee } from "../../../DB/models/employeeModel.js";
import bcrypt from "bcrypt";
import { compareSync } from "bcrypt";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
import { Department } from "../../../DB/models/departmentModel.js";
// log in api
export const log_in = async (req, res, next) => {
  const { email, password } = req.body;
  const is_user_exists = await Employee.findOne({ email });
  if (!is_user_exists) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  if (is_user_exists.status === "inactive") {
    return next(
      new Error_handler_class(
        "your account is inactive, please contact admin",
        403,
        "login api"
      )
    );
  }

  const pass_check = compareSync(password, is_user_exists.password);
  if (!pass_check) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const token = jwt.sign(
    { user_id: is_user_exists._id, role: is_user_exists.role },
    process.env.SIGNATURE,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({
    message: "user logged in successfully",
    token: token,
    user: {
      is_user_exists,
    },
  });
};
// get profile api
export const list_profile = async (req, res, next) => {
  const { _id } = req.authEmployee;
  const find_user = await Employee.findById(_id).select("-password");

  if (!find_user) {
    next(new Error_handler_class("user not found", 404, "list profile api"));
  }

  const department = await Department.findById(find_user.department);
  res.status(200).json({
    success: true,
    find_user,
    department: department.name,
  });
};
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await Employee.findOne({ email });

  if (!user) return next(new Error("User not found!", { cause: 404 }));

  const forgetCode = randomstring.generate({
    length: 5,
    charset: "numeric",
  });

  user.forgetCode = forgetCode;
  await user.save();

  //send email
  const messageSent = await sendEmail({
    to: email,
    subject: "Forget password",
    html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; background-color: #fefefe; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
  <h2 style="text-align: center; color: #2c3e50;">🔐 Password Reset Request</h2>
  <p style="font-size: 16px; color: #555; text-align: center;">
    Use the following verification code to reset your password. This code is valid for a limited time:
  </p>
  <div style="margin: 30px auto; background-color: #f0f4f8; padding: 20px 30px; text-align: center; border-radius: 8px; border: 1px dashed #ccc; width: fit-content;">
    <span style="font-size: 32px; color: #007bff; font-weight: bold; letter-spacing: 4px;">${forgetCode}</span>
  </div>
  <p style="text-align: center; font-size: 14px; color: #999;">
    If you didn’t request a password reset, you can safely ignore this email.
  </p>
  <p style="text-align: center; font-size: 14px; color: #ccc; margin-top: 30px;">— Support Team</p>
</div>`,
  });
  if (!messageSent) return next(new Error("Something went wrong!"));

  return res.json({
    success: true,
    message: "Forget code sent to user successfully",
    forgetCode,
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password, forgetCode } = req.body;

  const user = await Employee.findOne({ email });

  if (!user) return next(new Error("User not found!", { cause: 404 }));

  if (forgetCode !== user.forgetCode)
    return next(new Error("Invalid code!", { cause: 406 }));

  user.password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  await user.save();

  return res.json({
    success: true,
    message: "Try to login now :)",
  });
});
