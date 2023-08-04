import CreateEmployeeDto from "../dto/create-employee.dto";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class EmployeeService{
    
    constructor(private employeeRepository : EmployeeRepository)
    {

    }

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAllEmployees();
    }

    async getEmployeeById(id:number): Promise<Employee| null> {
        const employee= await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not Found with id:${id}`);
        }
        return employee;
    }
    async createEmployee(createEmployeeDto:CreateEmployeeDto): Promise <Employee> {
        const employee = new Employee();
        employee.name=createEmployeeDto.name;
        employee.email=createEmployeeDto.email;
        employee.role= createEmployeeDto.role;
        employee.password=await bcrypt.hash(createEmployeeDto.password,10);
        const newAddress= new Address();
        newAddress.line1=createEmployeeDto.address.line1;
        newAddress.pincode=createEmployeeDto.address.pincode;
        employee.address=newAddress;
        return this.employeeRepository.createAnEmployee(employee);
    }
    async updateEmployeeById(id:number,updateEmployeeDto: UpdateEmployeeDto): Promise <Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        employee.name = updateEmployeeDto.name;
        employee.email = updateEmployeeDto.email;
        if(employee.address && updateEmployeeDto.address) {
            employee.address.line1=updateEmployeeDto.address.line1;
            employee.address.pincode=updateEmployeeDto.address.pincode;
        }
        
        
        return this.employeeRepository.updateEmployeeById(employee);
    }
    async deleteEmployeeById(id:number): Promise <Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        return this.employeeRepository.deleteEmployeeById(employee);
    }

    loginEmployee = async(email:string,password:string)=>{
        const employee= await this.employeeRepository.findAnEmployeeByEmail(email);
        if(!employee)
        {
            throw new HttpException(401,"Incorrect username or Password");
        }

        const result = await bcrypt.compare(password,employee.password);
        if(!result)
        {
            throw new HttpException(401,"Incorrect username or Password");
        }

        const payload =
        {
            name:employee.name,
            email:employee.email,
            role:employee.role
        } 
        const token =jsonwebtoken.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:"1h"
        });

        return {token: token};
    }
}

export default EmployeeService;