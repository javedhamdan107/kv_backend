import express from "express";
import EmployeeService from "../service/employee.service";

class EmployeeController{
    public router : express.Router;

    constructor(private employeeService: EmployeeService)
    {
        this.router = express.Router();

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/",this.creeateEmployee);
        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee);
    }
    getAllEmployees = async (req: express.Request,res:express.Response)=> {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }
    getEmployeeById = async (req: express.Request,res:express.Response)=> {
        const employeeId = Number(req.params.id);
        const employees = await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employees);
    }
    creeateEmployee = async (req: express.Request,res:express.Response)=>{
        const email=req.body.email;
        const name=req.body.name;
        const employee = await this.employeeService.createEmployee(name,email);
        res.status(201).send(employee);
    }
    updateEmployee = async (req: express.Request,res:express.Response)=>{
        const id = Number(req.params.id);
        const email=req.body.email;
        const name=req.body.name;
        const employee = await this.employeeService.updateEmployeeById(id,name,email);
        res.status(201).send(employee);
    }
    deleteEmployee = async (req: express.Request,res:express.Response)=> {
        const employeeId = Number(req.params.id);
        await this.employeeService.deleteEmployeeById(employeeId);
        res.status(204).send('employee deleted');
    }
}

export default EmployeeController;