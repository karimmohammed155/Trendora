import {Router} from "express"
import * as HRDeptController from './HRDeptController.js';
import * as HRDeptSchema from './HRDeptSchema.js';
import { validation } from "../../middlewares/validationMiddleware.js";
import { auth } from "../../middlewares/auth_middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
const router=Router();



//add new employee
router.post('/employees',validation(HRDeptSchema.addNewEmployee),HRDeptController.addNewEmployee);

//update employee
router.put('/employees/:id',validation(HRDeptSchema.updateEmployee),HRDeptController.updateEmployee);

//delete employee
router.delete('/employees/:id',validation(HRDeptSchema.deleteEmployee),HRDeptController.deleteEmployee);

//get all employees
router.get('/employees/HRDeprt',HRDeptController.getAllEmployees);

//get specfic employee
router.get('/employees/:id',validation(HRDeptSchema.getEmployeeById),HRDeptController.getEmployeeById);

//Departments
//add new department
router.post('/departments',validation(HRDeptSchema.addNewDepartment),HRDeptController.addNewDepartment);

//update department
router.put('/departments/:id',validation(HRDeptSchema.updateDepartment),HRDeptController.updateDepartment);

//delete department
router.delete('/departments/:id',validation(HRDeptSchema.deleteDepartment),HRDeptController.deleteDepartment);  

//get all departments
router.get('/departments',HRDeptController.getAllDepartments);

//leaves
//get all leaves

//update leave status
router.put('/leaves/:id',validation(HRDeptSchema.updateLeaveSchema),HRDeptController.updateLeaveStatus);

//delete leave
router.delete('/leaves/:id',validation(HRDeptSchema.deleteLeaveSchema),HRDeptController.deleteLeave);

//get all leaves
router.get('/leaves',HRDeptController.getAllLeaves);

//payroll::
//get all payroll
router.get('/payroll',HRDeptController.getPayroll);

//generate payslip
router.post('/payroll/:id',validation(HRDeptSchema.generatePayrollSchema),HRDeptController.generatePayslip);

//get specific payslip
router.get('/payroll/:id',validation(HRDeptSchema.getPayrollByIdSchema),HRDeptController.getPayslip);

//update payroll 
router.put('/payroll/:id',validation(HRDeptSchema.updatePayrollSchema),HRDeptController.updatePayroll);

//delete payroll
router.delete('/payroll/:id',validation(HRDeptSchema.deletePayrollSchema),HRDeptController.deletePayroll);

router.get('/attendance',HRDeptController.getAttendance);

router.delete('/attendance/:id',validation(HRDeptSchema.deleteSheetSchema),HRDeptController.deleteSheet);

export default router;