import express from "express";
import Employee from "./Employee";
import { DataSource, FindOptionsWhere, Like } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dataSource from "./data-source";

const employeeRouter = express.Router();

employeeRouter.get('/',async (req,res) => {
    console.log(req.url);
    const nameFilter = req.query.name as string;
    const emailFilter = req.query.email as string;
    const employeeRepository = dataSource.getRepository(Employee);
    const qb = employeeRepository.createQueryBuilder();
    if(nameFilter)
    {
        qb.where("name LIKE :name",{name: `${nameFilter}%`});
    }
    if(emailFilter)
    {
        qb.andWhere("email LIKE :email",{email: `%${emailFilter}%`});
    }
    
    
    const employees= await qb.getMany()
    
    res.status(200).send(employees);
});

employeeRouter.get('/:id',async (req,res) => {
    console.log(req.url);
 
   

    const employeeRepository = dataSource.getRepository(Employee);
    const employee=await employeeRepository.findOneBy({id: Number(req.params.id)});
    if(employee)
    {
        res.status(200).send(employee);
    }
    else
    {
        res.status(404).send();
    }

    

});

employeeRouter.post('/',async(req,res) => {
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;

    const employeeRepository = dataSource.getRepository(Employee);
    const savedEmployee=await employeeRepository.save(newEmployee)
    res.status(201).send(savedEmployee);
});

employeeRouter.put('/:id',async(req,res) => {
    console.log(req.url);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee=await employeeRepository.findOneBy({id: Number(req.params.id)});
    employee.email=req.body.email;
    employee.name=req.body.name;
    const updatedEmployee=await employeeRepository.save(employee);
    
    res.status(201).send(updatedEmployee);
});

employeeRouter.patch('/:id',(req,res) => {
    console.log(req.url);
    res.status(201).send("employee updated");
});

employeeRouter.delete('/:id',async (req,res) => {
    console.log(req.url);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee=await employeeRepository.findOneBy({id: Number(req.params.id)});
    await employeeRepository.softRemove(employee);

    res.status(204).send("employee deleted");
});
export default employeeRouter;