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
import authorize from "../middleware/authorize.middleware";
import DepartmentService from "../service/department.service";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
class DepartmentController{
    public router : express.Router;

    constructor(private departmentService: DepartmentService)
    {
        this.router = express.Router();

        this.router.get("/",this.getAllDepartment);
        this.router.get("/:id",this.getDepartmentById);
        this.router.post("/",this.createDepartment);
        this.router.put("/:id",this.updateDepartment);
        this.router.delete("/:id",this.deleteDepartment);

    }
    getAllDepartment = async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const departments = await this.departmentService.getAllDepartment();
            res.status(200).send(departments);
        }
        catch(error)
        {
            next(error);
        }
        
    }
    getDepartmentById = async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const departmentId = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentId);
            res.status(200).send(department);
        }
        catch(error)
        {
            next(error);
        }
        
    }
    createDepartment = async (req: express.Request,res:express.Response,next:NextFunction)=>{

        try{

            
            const createDepartmentDto=plainToInstance(CreateDepartmentDto,req.body);
            const errors= await validate(createDepartmentDto);
            if(errors.length > 0)
            {
                
                throw new ValidationException(400, "Validation Errors", errors);

                //throw new PropertyRequiredError("Name not found");

            }
            else{
                const department = await this.departmentService.createDepartment(createDepartmentDto);
          
            res.status(201).send(department);
            }

            
        }
        catch(error)
        {
            
            next(error);
        }
        
    }
    updateDepartment = async (req: express.Request,res:express.Response,next:NextFunction)=>{
        
        try{
            const id = Number(req.params.id);
            const updateDepartmentDto=plainToInstance(UpdateDepartmentDto,req.body);
            const errors= await validate(updateDepartmentDto);
            if(errors.length > 0)
            {
                throw new ValidationException(400, "Validation Errors", errors);

            }

            const department = await this.departmentService.updateDepartmentById(id,updateDepartmentDto);
            res.status(201).send(department);
        }
        catch(error)
        {
            next(error);
        }
        
        
    }
    deleteDepartment= async (req: express.Request,res:express.Response,next:NextFunction)=> {
        try{
            const departmentId = Number(req.params.id);
            await this.departmentService.deleteDepartmentById(departmentId);
            res.status(204).send('department deleted');
        }
        catch(error)
        {
            next(error)
        }
        
    }



}

export default DepartmentController;