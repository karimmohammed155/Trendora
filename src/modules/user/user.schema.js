import joi from "joi";

const signin_val = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(1)
      .message("The password cannot be empty")
      .required(),
  })
  .required();

const update_profile_val = joi.object({
  username: joi.string().min(2).max(25),
  password: joi
    .string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
    .message(
      "The password must be at least 8 characters and contain one lowercase , one uppercase and one special case"
    ),
});
export const forgetPassword=joi.object({
    email:joi.string().email().required(),
}).required();

export const resetPassword=joi.object({
    email:joi.string().email().required(),
    password:joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/).required(),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),
    forgetCode:joi.string().length(5).required(),
}).required();

export const changePassword=joi.object({
   
    password:joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/).required(),
    newPassword:joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/).required(),
    confirmPassword:joi.string().valid(joi.ref("newPassword")).required(),

}).required();
export { signin_val, update_profile_val };
