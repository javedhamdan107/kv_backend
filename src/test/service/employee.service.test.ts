import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import UpdateEmployeeDto from "../../dto/update-employee.dto";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import HttpException from "../../exceptions/http.exception";
dotenv.config({ path: __dirname + '/../../../.env' });

describe('Employee Service Test', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });

    describe('Test for getEmployeeById', () => {
        test('Test case success for getEmployeeById for id 1', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({ id: 1, name: "Name" });
            employeeRepository.findAnEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual({ id: 1, name: "Name" });
        });

        test('Test case failure for getEmployeeById for id 2', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(2).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById = mockFunction;
            expect(async () => { await employeeService.getEmployeeById(2) }).rejects.toThrowError(HttpException);
        });

        test('Test case success for getAllEmployees', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce([{ id: 1, name: "Name" }]);
            employeeRepository.findAllEmployees = mockFunction;
            const employee = await employeeService.getAllEmployees();
            expect(employee).toStrictEqual([{ id: 1, name: "Name" }]);
        });

        test('Test case empty result for getAllEmployees', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce([]);
            employeeRepository.findAllEmployees = mockFunction;
            const employees = await employeeService.getAllEmployees();
            expect(employees).toStrictEqual([]);
        });

        test('Test case success for createEmployee', async () => {
            const user = {
                username: "name",
                password: "pass",
                department:"dept",
                role:"R",
                address: {
                    address_line_1: "line 1",
                    address_line_2: "line 2",
                    city: "city",
                    state: "state",
                    country:"country",
                    pincode: "pincode"
                }
            };
            const mockFunction = jest.fn();
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, user)
            when(mockFunction).mockResolvedValue({ id: 1 ,username:"name"});
            employeeRepository.createAnEmployee = mockFunction;
            const employee = await employeeService.createEmployee(createEmployeeDto);
            expect(employee).toStrictEqual({ id: 1,username:"name"});
        });

        test('Test case failure for createEmployee', async () => {
            const mockFunction = jest.fn();
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, { username: "name" });
            
            when(mockFunction).calledWith(createEmployeeDto).mockResolvedValueOnce({ username: "name" });
            employeeRepository.createAnEmployee = mockFunction;
            expect(async () => await employeeService.createEmployee(createEmployeeDto)).rejects.toThrowError();
        });

        test('Test case success for updateEmployee with id = 1', async () => {
            const body = {
                username: "name",
                password:"pass"
            };

            const mockFunction1 = jest.fn();
            when(mockFunction1).calledWith(1).mockResolvedValueOnce({ id: 1, username: "OLD NAME" });
            employeeRepository.findAnEmployeeById = mockFunction1;

            const mockFunction2 = jest.fn();
            when(mockFunction2).mockResolvedValue({ id: 1, username: "name" });
            employeeRepository.updateEmployeeById = mockFunction2;
            const updatedEmployee=await employeeService.updateEmployeeById(1, plainToInstance(UpdateEmployeeDto, body))

            expect(updatedEmployee).toStrictEqual({ id: 1, username: "name" })
        });

        test('Test case success for deleteEmployee with id = 1', async () => {
            const mockFunction1 = jest.fn();
            when(mockFunction1).calledWith("1").mockResolvedValueOnce({ id: 1, username: "name" });
            employeeRepository.findAnEmployeeById = mockFunction1;

            const mockFunction2 = jest.fn();
            when(mockFunction2).mockResolvedValue({});
            employeeRepository.deleteEmployeeById = mockFunction2;
            const deletedEmployee=await employeeService.deleteEmployeeById(1)

            expect(deletedEmployee).toStrictEqual({});
        });

     

        test('Test case success for loginEmployee', async () => {

            const employee = new Employee();
            employee.username = "username";
            employee.password = await bcrypt.hash("password", 10);

            const mockFunction = jest.fn();
            when(mockFunction).calledWith(employee.username).mockResolvedValueOnce(employee);
            employeeRepository.findAnEmployeeByUserName = mockFunction;

            const token = await employeeService.loginEmployee("username","password");
            expect(token).toBeDefined();
        });

        test('Test case failure for loginEmployee invalid username', async () => {


            const employee = new Employee();
            employee.name = "name";
            employee.username = "username";
            employee.password = await bcrypt.hash("password", 10);

            const mockFunction = jest.fn();
            when(mockFunction).calledWith(employee.username).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeByUserName = mockFunction;

            expect(async () => await employeeService.loginEmployee("name","password")).rejects.toThrowError(HttpException);
        });

        test('Test case failure for loginEmployee invalid password', async () => {

            const employee = new Employee();
            employee.username = "username";
            employee.password = await bcrypt.hash("password", 10);

            const mockFunction = jest.fn();
            when(mockFunction).calledWith(employee.username).mockResolvedValueOnce(employee);
            employeeRepository.findAnEmployeeByUserName = mockFunction;

            expect(async () => await employeeService.loginEmployee("username","pass")).rejects.toThrowError(HttpException);
        });
    });
});