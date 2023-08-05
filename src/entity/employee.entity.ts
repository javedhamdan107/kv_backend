import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";
// import Department from "./department.entity";


@Entity("employees")
class Employee extends AbstractEntity{
    
    @Column()
    name:string;

    @Column()
    username:string;

    @Column({nullable: true})
    age:number;

    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address:Address;

    @Column()
    password: string;

    @Column()
    experience:number

    @Column()
    joining_date:string

    @Column({default:Role.DEVELOPER})
    role:Role;
    

    @ManyToOne(()=>Department,(department)=>department.employee,{cascade:true})
    department:number;
    
}

export default Employee;
