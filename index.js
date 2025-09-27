import express from 'express';
import { connectDB } from './DB/connection.js';
import dotenv from 'dotenv';
import HRDeptRouter from './src/modules/HRDepartment/HRDeptRouter.js';
import ITDeptRouter from './src/modules/ITDepartment/ITDeptRouter.js';
import OperationRouter from './src/modules/OperationDepartment/operationRouter.js';
import dashBoardRouter from './src/modules/dashboard/dashboardRouter.js';
import cors from 'cors';
dotenv.config();
await connectDB();
const app = express()
const port = process.env.PORT || 3000;



// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'], // Allow both Vite ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-role', 'x-user-id']
}));

app.use(express.json())

app.use('/api/hr',HRDeptRouter);
app.use('/api/it',ITDeptRouter);
app.use('/api/operation',OperationRouter);
app.use('/api/dashboard',dashBoardRouter);
app.all('/{*any}',(req,res,next)=>{
    return next(new Error("Page not found",{cause:404}));
});

app.use((error,req,res,next)=>{
    const statusCode= error.cause || 500;

    return res.json({
        success:false,
        message:error.message,
        stack:error.stack
    });
});


app.listen(port, () => console.log(`App listening at ${port}`));