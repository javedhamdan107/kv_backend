import express from "express";
import Employee from "./Employee";

const employeeRouter = express.Router();
let count:number=2;
const employees:Employee[]=[{
    id:1,name:"name1",email:"email1@gmail.com",created_at:new Date(),updated_at:new Date()
},{
    id:2,name:"name2",email:"email2@gmail.com",created_at:new Date(),updated_at:new Date()
}]
employeeRouter.get('/',(req,res) => {
    console.log(req.url);
    res.status(200).send(employees);
});

employeeRouter.get('/:id',(req,res) => {
    console.log(req.url);
    const employee = employees.find(emp=>emp.id===Number(req.params.id))
    res.status(200).send(employee);
});

employeeRouter.post('/',(req,res) => {
    console.log(req.url);
    const newEmployee = new Employee();
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;
    newEmployee.id=++count;
    newEmployee.created_at=new Date();
    newEmployee.updated_at=new Date();
    employees.push(newEmployee);
    res.status(201).send(newEmployee);
});

employeeRouter.put('/:id',(req,res) => {
    console.log(req.url);
    const employee = employees.find(emp=>emp.id===Number(req.params.id));
    employee.email=req.body.email;
    employee.name=req.body.name;
    employee.updated_at=new Date();
    res.status(201).send(employee);
});

employeeRouter.patch('/:id',(req,res) => {
    console.log(req.url);
    res.status(201).send("employee updated");
});

employeeRouter.delete('/:id',(req,res) => {
    console.log(req.url);
    //const employee = employees.find(emp=>emp.id===Number(req.params.id));
    let index= employees.findIndex(emp=>emp.id===Number(req.params.id));
    employees.splice(index,1);
    res.status(204).send("employee deleted");
});
export default employeeRouter;