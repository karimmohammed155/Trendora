import mongoose, { model, Schema } from "mongoose";

const DepartmentSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum:["HR", "Accounting", "IT", "Administration","Operation","Digital Marketing","Sales"]
  }
}, { timestamps: true ,versionKey:false});

export const Department= model("Department", DepartmentSchema);
