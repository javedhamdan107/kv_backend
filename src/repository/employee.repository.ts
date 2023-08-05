import { DataSource, Repository } from "typeorm";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository{
    private dataSource : DataSource;

    constructor(private employeeRepository:Repository<Employee>) {

    }

    findAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find({
            select: ["department"],
            relations: ["department"]
          });
    }

    findAnEmployeeById(id:number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where:{id:id},
            relations: ["address","department"]
        });
    }
    findAnEmployeeByUserName(username:string): Promise<Employee> {
        return this.employeeRepository.findOne({
            where:{username:username},
            relations:
            {
                address:true,
            }
        });
    }
    createAnEmployee(newEmployee:Employee): Promise<Employee> {
        return this.employeeRepository.save(newEmployee)
    }
    
    updateEmployeeById(updatedEmployee:Employee): Promise<Employee>
    {
        return this.employeeRepository.save(updatedEmployee);
    }
    deleteEmployeeById(deletedEmployee:Employee): Promise<Employee>
    {
        return this.employeeRepository.softRemove(deletedEmployee);
    }

}

export default EmployeeRepository;