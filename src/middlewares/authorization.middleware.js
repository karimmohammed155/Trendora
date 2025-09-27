import { asyncHandler } from "../utils/asyncHandler.js";

export const authorization = (allowed_roles) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.authUser;

    if (!allowed_roles.includes(user.role)) {
      return next(new AppError("You are not allowed to access this role", 403));
    }

    next();
  });
};
