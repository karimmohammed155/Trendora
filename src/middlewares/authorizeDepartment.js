import { Department } from "../../DB/models/departmentModel.js";

export const authorizeDepartment = (requiredDepartment) => {
  return async (req, res, next) => {
    try {
      const user = req.authEmployee;

      if (!user)
        return res.status(401).json({ message: "User not authenticated" });

      // 🔓 Admins can access any department
      if (user.role === "Admin") return next();

      // 🧩 Check if department exists (optional — only if you need validation)
      const department = await Department.findOne({ name: requiredDepartment });
      if (!department)
        return res.status(404).json({ message: "Department not found" });

      // 🧩 Compare user's department with required one
      console.log("User's department:", user.department);
      console.log("Required department:", department._id);
      if (!user.department.equals(department._id)) {
  return res.status(403).json({ message: "Access denied for this department" });
}

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({ message: "Server error during authorization" });
    }
  };
};
