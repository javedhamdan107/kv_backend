import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { ValidationError } from "class-validator";
import ValidationErrors from "../exceptions/validation.errors";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    
    try{
        console.log(error.stack);
        if(error instanceof HttpException)
        {
            res.status(error.status).send({error:error.message});
            return;
        }
        else if(error instanceof ValidationErrors)
        {
            res.status(400).send({message:error.message,errors:error.errors});
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