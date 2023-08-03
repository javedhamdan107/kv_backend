import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    
    try{
        console.log(error.stack);
        if(error instanceof HttpException)
        {
            res.status(error.status).send({error:error.message});
            return;
        }
        else
        res.status(500).send(error.message);
    }
    catch (err)
    {
        next(err);
    }
   
}

export default errorMiddleware;