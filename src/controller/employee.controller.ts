import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";

import { Express } from "express";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { ValidationError, validate } from "class-validator";
import PropertyRequiredError from "../exceptions/validation.errors";
import ValidationException from "../exceptions/validation.errors";
class EmployeeController{
    public router : express.Router;

    constructor(private employeeService: EmployeeService)
    {
        this.router = express.Router();

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/",this.createEmployee);
        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee);
    }
    getAllEmployees = async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        }
        catch(error)
        {
            next(error);
        }
        
    }
    getEmployeeById = async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const employeeId = Number(req.params.id);
            const employees = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(employees);
        }
        catch(error)
        {
            next(error);
        }
        
    }
    createEmployee = async (req: express.Request,res:express.Response,next:NextFunction)=>{

        try{
            const email=req.body.email;
            const name=req.body.name;
            const address=req.body.address;
            
            const createEmployeeDto=plainToInstance(CreateEmployeeDto,req.body);
            const errors= await validate(createEmployeeDto);
            if(errors.length > 0)
            {
                
                throw new ValidationException(400, "Validation Errors", errors);

                //throw new PropertyRequiredError("Name not found");

            }
            else{
                const employee = await this.employeeService.createEmployee(name,email,address);
          
            res.status(201).send(employee);
            }

            
        }
        catch(error)
        {
            
            next(error);
        }
        
    }
    updateEmployee = async (req: express.Request,res:express.Response,next:NextFunction)=>{
        
        try{
            const id = Number(req.params.id);
            const email=req.body.email;
            const name=req.body.name;
            const address=req.body.address;
            const createEmployeeDto=plainToInstance(CreateEmployeeDto,req.body);
            const errors= await validate(createEmployeeDto);
            if(errors.length > 0)
            {
                //console.log(errors);

            }

            const employee = await this.employeeService.updateEmployeeById(id,name,email,address);
            res.status(201).send(employee);
        }
        catch(error)
        {
            next(error);
        }
        
        
    }
    deleteEmployee = async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const employeeId = Number(req.params.id);
            await this.employeeService.deleteEmployeeById(employeeId);
            res.status(204).send('employee deleted');
        }
        catch(error)
        {
            next(error)
        }
        
    }
}

export default EmployeeController;