import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { ValidationError } from "class-validator";
import ValidationErrors from "../exceptions/validation.errors";
import logger from "../utils/winston.logger";

const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    
    try{
        console.log(error.stack);
        if(error instanceof ValidationErrors)
        {
            logger.error(`message:${error.message} error:${[error.errors]}`)
            res.status(error.status).send({message:error.message,errors:error.errors});
            return;
        }
        else if(error instanceof HttpException)
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