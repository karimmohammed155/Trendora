import express from 'express';
import { connectDB } from './DB/connection.js';
import dotenv from 'dotenv';
import HRDeptRouter from './src/modules/HRDepartment/HRDeptRouter.js';
import ITDeptRouter from './src/modules/ITDepartment/ITDeptRouter.js';

dotenv.config();
await connectDB();
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())

app.use('/api/hr',HRDeptRouter);
app.use('/api/it',ITDeptRouter);

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