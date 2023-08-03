import "reflect-metadata";
import express from "express";
import dataSource from "./db/postgres.db";
import loggerMiddleware from "./middleware/logger.middleware";
import employeeRoute from "./route/employee.route";


const server=express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employeeRoute);


server.get('/*',(req,res) => {
    console.log(req.url);
    res.status(200).send("Hello world typescript");
});

(async ()=>{
    await dataSource.initialize();
    server.listen(3000,()=> {
        console.log("Server is listening to 3000");
    });
    
})();

