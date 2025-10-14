import express from "express";
import { connectDB } from "./DB/connection.js";
import dotenv from "dotenv";
import HRDeptRouter from "./src/modules/HRDepartment/HRDeptRouter.js";
import ITDeptRouter from "./src/modules/ITDepartment/ITDeptRouter.js";
import OperationRouter from "./src/modules/OperationDepartment/operationRouter.js";
import dashBoardRouter from "./src/modules/dashboard/dashboardRouter.js";
import { accounting_router, user_router } from "./src/modules/index.js";
import digitalMarketingRouter from "./src/modules/digitalMarketing/digitalMarketingRouter.js";

import cors from "cors";
import { global_response } from "./src/middlewares/error.handle.middleware.js";
import { authorizeDepartment } from "./src/middlewares/authorizeDepartment.js";
import { auth } from "./src/middlewares/auth_middleware.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (React build)
app.use(express.static(path.join(__dirname, "dist"))); // or "dist" if using Vite

// Fallback for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

dotenv.config();
await connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use(
  "/api/digitalMarketing",
  auth(),
  authorizeDepartment("Digital Marketing"),
  digitalMarketingRouter
);
app.use("/api/user", user_router);
app.use("/api/hr", auth(), authorizeDepartment("HR"), HRDeptRouter);
app.use("/api/it", auth(), authorizeDepartment("IT"), ITDeptRouter);
app.use(
  "/api/operation",
  auth(),
  authorizeDepartment("Operation"),
  OperationRouter
);
app.use("/api/dashboard", dashBoardRouter);
app.use(
  "/api/accounting",
  auth(),
  authorizeDepartment("Accounting"),
  accounting_router
);
app.all("/{*any}", (req, res, next) => {
  return next(new Error("Page not found", { cause: 404 }));
});

app.use(global_response);
app.use((error, req, res, next) => {
  const statusCode = error.cause || 500;

  return res.json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => console.log(`App listening at ${port}`));
