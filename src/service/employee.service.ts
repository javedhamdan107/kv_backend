import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exception";
import EmployeeRepository from "../repository/employee.repository";

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
    createEmployee(name:string,email:string,address:any): Promise <Employee> {
        const employee = new Employee();
        employee.name=name;
        employee.email=email;
        const newAddress= new Address();
        newAddress.line1=address.line1;
        newAddress.pincode=address.pincode;
        employee.address=newAddress;
        return this.employeeRepository.createAnEmployee(employee);
    }
    async updateEmployeeById(id:number,name:string,email:string): Promise <Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        employee.name = name;
        employee.email = email;
        return this.employeeRepository.updateEmployeeById(employee);
    }
    async deleteEmployeeById(id:number): Promise <Employee>
    {
        const employee=await this.employeeRepository.findAnEmployeeById(id);
        return this.employeeRepository.deleteEmployeeById(employee);
    }
}

export default EmployeeService;