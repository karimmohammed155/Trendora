import { Error_handler_class } from "../utils/index.js";

export const authorization = (allowed_rules) => {
  return async (req, res, next) => {
    const user = req.authUser;
    if (!allowed_rules.includes(user.role)) {
      return next(
        new Error_handler_class(
          "authorization error",
          401,
          "you are not allowed to acces this role"
        )
      );
    }
    next();
  };
};
