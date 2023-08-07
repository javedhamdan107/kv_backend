import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exceptions/http.exception";
import DepartmentRepository from "../repository/department.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import EmployeeService from "./employee.service";
import EmployeeRepository from "../repository/employee.repository";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";

class DepartmentService{
    
    constructor(private departmentRepository : DepartmentRepository,private employeeService :EmployeeService)
    {

    }

    getAllDepartment(): Promise<Department[]> {
        return this.departmentRepository.findAllDepartment();
    }

    async getDepartmentById(id:number): Promise<Department| null> {
        const department= await this.departmentRepository.findADepartmentById(id);
        if(!department)
        {
            throw new HttpException(404,`Department not Found with id:${id}`);
        }
        return department;
    }
    async createDepartment(createDepartmentDto:CreateDepartmentDto): Promise <Department> {
        const department = new Department();
        department.name=createDepartmentDto.name;
        return this.departmentRepository.createADepartment(department);
    }
    async updateDepartmentById(id:number,updateDepartmentDto: UpdateDepartmentDto): Promise <Department>
    {
        const department=await this.departmentRepository.findADepartmentById(id);
        department.name = updateDepartmentDto.name;
        
        return this.departmentRepository.updateDepartmentById(department);
    }
    async deleteDepartmentById(id:number): Promise <Department>
    {
        
        const department=await this.departmentRepository.findADepartmentById(id);
        const employees=await this.employeeService.getEmployeeByDepartmentId(id);
        if(employees)
        {
            throw new HttpException(404,`Department already has employees`);
        }

        return this.departmentRepository.deleteDepartmentById(department);
    }

 
}

export default DepartmentService;