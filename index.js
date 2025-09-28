import express from 'express';
import { connectDB } from './DB/connection.js';
import dotenv from 'dotenv';
import HRDeptRouter from './src/modules/HRDepartment/HRDeptRouter.js';
import ITDeptRouter from './src/modules/ITDepartment/ITDeptRouter.js';
import OperationRouter from './src/modules/OperationDepartment/operationRouter.js';
import dashBoardRouter from './src/modules/dashboard/dashboardRouter.js';
import {user_router} from './src/modules/index.js';
import cors from 'cors';
dotenv.config();
await connectDB();
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())

// Enable CORS for all routes
app.use(cors());


app.use('/api/user',user_router);
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