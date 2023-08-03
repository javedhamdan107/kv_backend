import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    
    constructor(private employeeRepository : EmployeeRepository)
    {

    }

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAllEmployees();
    }

    getEmployeeById(id:number): Promise<Employee| null> {
        return this.employeeRepository.findAnEmployeeById(id);
    }
    createEmployee(name:string,email:string): Promise <Employee> {
        const employee = new Employee();
        employee.name=name;
        employee.email=email;
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