import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";


const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.PORT),
    username: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ["dist/entity/*.js"],
    logging: true,
    namingStrategy:new SnakeNamingStrategy(),
    migrations:["dist/db/migrations/*.js"]
})

export default dataSource;