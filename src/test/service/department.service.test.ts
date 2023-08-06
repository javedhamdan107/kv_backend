import { DataSource } from "typeorm";
import DepartmentService from "../../service/department.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import * as dotenv from "dotenv";
import HttpException from "../../exceptions/http.exception";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department.entity";
import CreateDepartmentDto from "../../dto/create-department.dto";
import { plainToInstance } from "class-transformer";
import UpdateDepartmentDto from "../../dto/update-department.dto";
dotenv.config({ path: __dirname + '/../../../.env' });

describe('Department Service Test', () => {
    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        departmentService = new DepartmentService(departmentRepository);
    });

    describe('Test for getDepartmentById', () => {
        test('Test case success for getDepartmentById for id 1', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({ id: 1, name: "Name" });
            departmentRepository.findADepartmentById = mockFunction;
            const department = await departmentService.getDepartmentById(1);
            expect(department).toStrictEqual({ id: 1, name: "Name" });
        });

        test('Test case failure for getDepartmentById for id 2', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(2).mockResolvedValueOnce(null);
            departmentRepository.findADepartmentById = mockFunction;
            expect(async () => { await departmentService.getDepartmentById(2) }).rejects.toThrowError(HttpException);
        });

        test('Test case success for getAllDepartments', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce([{ id: 1, name: "Name" }]);
            departmentRepository.findAllDepartment = mockFunction;
            const department = await departmentService.getAllDepartment();
            expect(department).toStrictEqual([{ id: 1, name: "Name" }]);
        });

        test('Test case empty for getAllDepartments', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce([]);
            departmentRepository.findAllDepartment = mockFunction;
            const department = await departmentService.getAllDepartment();
            expect(department).toStrictEqual([]);
        });
        

       

        test('Test case success for createDepartment', async () => {
            const department_body = {
                name: "name"
            };
            const mockFunction = jest.fn();
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, department_body)
            when(mockFunction).mockResolvedValue({ id: 1 ,name:"name"});
            departmentRepository.createADepartment = mockFunction;
            const department = await departmentService.createDepartment(createDepartmentDto);
            expect(department).toStrictEqual({ id: 1,name:"name"});
        });
        // test('Test case failure for createDepartment', async () => {
        //     const department_body = {
        //         name: "name"
        //     };
        //     const mockFunction = jest.fn();
        //     const createDepartmentDto = plainToInstance(CreateDepartmentDto, department_body)
        //     when(mockFunction).calledWith(createDepartmentDto).mockResolvedValueOnce({ name:"name"});
        //     departmentRepository.createADepartment = mockFunction;

        //     expect(async () =>  await departmentService.createDepartment(createDepartmentDto) ).rejects.toThrowError();
        // });

        test('Test case success for updateDepartment with id = 1', async () => {
            const body = {
                name: "name"
            };

            const mockFunction1 = jest.fn();
            when(mockFunction1).calledWith(1).mockResolvedValueOnce({ id: 1, name: "OLD NAME" });
            departmentRepository.findADepartmentById = mockFunction1;

            const mockFunction2 = jest.fn();
            when(mockFunction2).mockResolvedValue({ id: 1, name: "name" });
            departmentRepository.updateDepartmentById = mockFunction2;
            const updatedDepartment=await departmentService.updateDepartmentById(1, plainToInstance(UpdateDepartmentDto, body))

            expect(updatedDepartment).toStrictEqual({ id: 1, name: "name" })
        });

            test('Test case success for deleteDepartment with id = 1', async () => {
                const mockFunction1 = jest.fn();
                when(mockFunction1).calledWith(1).mockResolvedValueOnce({ id: 1, name: "name" });
                departmentRepository.findADepartmentById = mockFunction1;

                const mockFunction2 = jest.fn();
                when(mockFunction2).mockResolvedValue({});
                departmentRepository.deleteDepartmentById = mockFunction2;
                const deletedDepartment=await departmentService.deleteDepartmentById(1)

                expect(deletedDepartment).toStrictEqual({});
            }); 
    });
});