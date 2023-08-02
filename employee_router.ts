import express from "express";
import Employee from "./Employee";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dataSource from "./data-source";

const employeeRouter = express.Router();
let count:number=2;
const employees:Employee[]=[{
    id:1,name:"name1",email:"email1@gmail.com",createdAt:new Date(),updatedAt:new Date()
},{
    id:2,name:"name2",email:"email2@gmail.com",createdAt:new Date(),updatedAt:new Date()
}]
employeeRouter.get('/',async (req,res) => {
    console.log(req.url);
    const employeeRepository = dataSource.getRepository(Employee);
    const employees= await employeeRepository.find();
    res.status(200).send(employees);
});

employeeRouter.get('/:id',async (req,res) => {
    console.log(req.url);
 
   

    const employeeRepository = dataSource.getRepository(Employee);
    const employee=await employeeRepository.findOneBy({id: Number(req.params.id)});

    res.status(200).send(employee);

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
    await employeeRepository.remove(employee);
    res.status(204).send("employee deleted");
});
export default employeeRouter;