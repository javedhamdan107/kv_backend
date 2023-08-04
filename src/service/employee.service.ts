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
    async createEmployee(name:string,email:string,address:any,password:string): Promise <Employee> {
        const employee = new Employee();
        employee.name=name;
        employee.email=email;
        employee.password=await bcrypt.hash(password,10);
        const newAddress= new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;
        employee.address=newAddress;
        return this.employeeRepository.createAnEmployee(employee);
    }
    async updateEmployeeById(id:number,name:string,email:string,address:any): Promise <Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        employee.name = name;
        employee.email = email;
        if(employee.address && address) {
            employee.address.line1=address.line1;
            employee.address.pincode=address.pincode;
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
            email:employee.email
        } 
        const token =jsonwebtoken.sign(payload,"ABCDE",{
            expiresIn:"1h"
        });

        return {token: token};
    }
}

export default EmployeeService;