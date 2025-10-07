import jwt from "jsonwebtoken";
import { Employee } from "../../DB/models/employeeModel.js";

export const auth = () => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;

      if (!token) {
        return res.status(400).json({
          message: "please sign_in first , there is no token generated",
        });
      }

      if (!token.startsWith(process.env.BEARER)) {
        return res.status(400).json({
          message: "invalid token",
        });
      }

      const original_token = token.split(" ")[1];
      const decoded_data = jwt.verify(original_token, process.env.SIGNATURE);

      if (!decoded_data?.user_id) {
        return res.status(400).json({
          message: "invalid token payload",
        });
      }

      const employee = await Employee.findById(decoded_data.user_id);

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }

      req.authEmployee = employee;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
