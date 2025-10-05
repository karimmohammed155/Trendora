import {Router} from "express"
import * as HRDeptController from './HRDeptController.js';
import * as HRDeptSchema from './HRDeptSchema.js';
import { validation } from "../../middlewares/validationMiddleware.js";
import { auth } from "../../middlewares/auth_middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
const router=Router();



//add new employee
router.post('/employees',auth(),validation(HRDeptSchema.addNewEmployee),HRDeptController.addNewEmployee);

//update employee
router.put('/employees/:id',auth(),validation(HRDeptSchema.updateEmployee),HRDeptController.updateEmployee);

//delete employee
router.delete('/employees/:id',auth(),validation(HRDeptSchema.deleteEmployee),HRDeptController.deleteEmployee);

//get all employees
router.get('/employees/HRDeprt',auth(),HRDeptController.getAllEmployees);

//get specfic employee
router.get('/employees/:id',auth(),validation(HRDeptSchema.getEmployeeById),HRDeptController.getEmployeeById);

//Departments
//add new department
router.post('/departments',auth(),validation(HRDeptSchema.addNewDepartment),HRDeptController.addNewDepartment);

//update department
router.put('/departments/:id',auth(),validation(HRDeptSchema.updateDepartment),HRDeptController.updateDepartment);

//delete department
router.delete('/departments/:id',auth(),validation(HRDeptSchema.deleteDepartment),HRDeptController.deleteDepartment);  

//get all departments
router.get('/departments',auth(),HRDeptController.getAllDepartments);

//leaves
//get all leaves

//update leave status
router.put('/leaves/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.updateLeaveSchema),HRDeptController.updateLeaveStatus);

//delete leave
router.delete('/leaves/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.deleteLeaveSchema),HRDeptController.deleteLeave);

//get all leaves
router.get('/leaves',auth(),HRDeptController.getAllLeaves);

//payroll::
//get all payroll
router.get('/payroll',auth(),HRDeptController.getPayroll);

//generate payslip
router.post('/payroll/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.generatePayrollSchema),HRDeptController.generatePayslip);

//get specific payslip
router.get('/payroll/:id',auth(),validation(HRDeptSchema.getPayrollByIdSchema),HRDeptController.getPayslip);

//update payroll 
router.put('/payroll/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.updatePayrollSchema),HRDeptController.updatePayroll);

//delete payroll
router.delete('/payroll/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.deletePayrollSchema),HRDeptController.deletePayroll);

router.get('/attendance',auth(),HRDeptController.getAttendance);

router.delete('/attendance/:id',auth(),authorization(['HR','Admin']),validation(HRDeptSchema.deleteSheetSchema),HRDeptController.deleteSheet);

export default router;