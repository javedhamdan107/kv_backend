import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";


@Entity("employees")
class Employee extends AbstractEntity{
    
    @Column()
    name:string;

    @Column()
    email:string;

    @Column({nullable: true})
    age:number;

    @OneToOne(()=>Address,(address)=>address.employee,{cascade:true})
    address:Address;

    @Column()
    password: string;
}

export default Employee;
