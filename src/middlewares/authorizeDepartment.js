export const authorizeDepartment = (requiredDepartment) => {
  return (req, res, next) => {
    const user = req.authEmployee;

    if (!user)
      return next(new Error("User not authenticated", { cause: 401 }));

    // 🔓 Admins can access everything
    if (user.role === "Admin") return next();

    // 🧩 Check department match
    if (user.department !== requiredDepartment) {
      return next(new Error("Access denied for this department", { cause: 403 }));
    }

    next();
  };
};
