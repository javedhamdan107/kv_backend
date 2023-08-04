import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";

describe('Employee Service tests',()=>{
    let employeeService :EmployeeService;
    let employeeRepository :EmployeeRepository;
    beforeAll(()=>{
        const dataSource : DataSource = {
            getRepository :jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    })

    describe('Test for getEmployeesById',()=>{
        test('test employee for 1',async()=>{

            const mockedFunction=jest.fn();
            when(mockedFunction).calledWith(22).mockResolvedValueOnce({
                "id": 22,
                "createdAt": "2023-08-03T23:54:48.905Z",
                "updatedAt": "2023-08-03T23:54:48.905Z",
                "deletedAt": null,
                "name": "Johan",
                "email": "johan@gmail.com",
                "age": null,
                "password": "$2b$10$cQjRiAwl3sR3F66wa2BBjujp7/HpqRQPsiOcrLKrmLW6ZCQseOUPC",
                "role": "Developer",
                "address": {
                    "id": 6,
                    "createdAt": "2023-08-03T23:54:48.905Z",
                    "updatedAt": "2023-08-03T23:54:48.905Z",
                    "deletedAt": null,
                    "line1": "HOUSE1",
                    "pincode": "686513"
                }
            });
            employeeRepository.findAnEmployeeById = mockedFunction;
            const employee = await employeeService.getEmployeeById(22);
            expect(employee).toStrictEqual({
                "id": 22,
                "createdAt": "2023-08-03T23:54:48.905Z",
                "updatedAt": "2023-08-03T23:54:48.905Z",
                "deletedAt": null,
                "name": "Johan",
                "email": "johan@gmail.com",
                "age": null,
                "password": "$2b$10$cQjRiAwl3sR3F66wa2BBjujp7/HpqRQPsiOcrLKrmLW6ZCQseOUPC",
                "role": "Developer",
                "address": {
                    "id": 6,
                    "createdAt": "2023-08-03T23:54:48.905Z",
                    "updatedAt": "2023-08-03T23:54:48.905Z",
                    "deletedAt": null,
                    "line1": "HOUSE1",
                    "pincode": "686513"
                }
            });

        });
    });
});

