import { DataSource, Repository } from "typeorm";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import Department from "../entity/department.entity";

class DepartmentRepository{
    private dataSource : DataSource;

    constructor(private departmentRepository:Repository<Department>) {

    }


 
    findAllDepartment(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    findADepartmentById(id:number): Promise<Department> {
        return this.departmentRepository.findOne({
            where:{id:id}
        });
    }

    createADepartment(newDepartment:Department): Promise<Department> {
        return this.departmentRepository.save(newDepartment)
    }
    
    updateDepartmentById(updatedDepartment:Department): Promise<Department>
    {
        return this.departmentRepository.save(updatedDepartment);
    }
    deleteDepartmentById(deletedDepartment:Department): Promise<Department>
    {
        return this.departmentRepository.softRemove(deletedDepartment);
    }

    

}

export default DepartmentRepository;