import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";

import { Express } from "express";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { ValidationError, validate } from "class-validator";
import PropertyRequiredError from "../exceptions/validation.errors";
import ValidationException from "../exceptions/validation.errors";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import authenticate from "../middleware/authenticate.middleware";
class EmployeeController{
    public router : express.Router;

    constructor(private employeeService: EmployeeService)
    {
        this.router = express.Router();

        this.router.get("/",authenticate,this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/",this.createEmployee);
        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee);
        this.router.post("/login",this.loginEmployee);
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

            
            const createEmployeeDto=plainToInstance(CreateEmployeeDto,req.body);
            const errors= await validate(createEmployeeDto);
            if(errors.length > 0)
            {
                
                throw new ValidationException(400, "Validation Errors", errors);

                //throw new PropertyRequiredError("Name not found");

            }
            else{
                const employee = await this.employeeService.createEmployee(req.body.name,req.body.email,req.body.address,req.body.password);
          
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
            const updateEmployeeDto=plainToInstance(UpdateEmployeeDto,req.body);
            const errors= await validate(updateEmployeeDto);
            if(errors.length > 0)
            {
                throw new ValidationException(400, "Validation Errors", errors);

            }

            const employee = await this.employeeService.updateEmployeeById(id,req.body.name,req.body.email,req.body.address);
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

    public loginEmployee = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        const{email,password}=req.body;
        try{
            const token = await this.employeeService.loginEmployee(email,password);
            res.status(200).send({data:token})
        }
        catch(error)
        {
            next(error);
        }
    }

}

export default EmployeeController;