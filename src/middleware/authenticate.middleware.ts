import { NextFunction, Request, Response, json } from "express";
import jsonwebtoken from "jsonwebtoken";

const authenticate = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = getTokenFromRequestHeader(req);
        jsonwebtoken.verify(token,"ABCDE");
        next();
    }
    catch(error)
    {
        next(error);
    }
}

const getTokenFromRequestHeader = (req:Request)=>{
    const bearerToken = req.header("Authorization");
    const token = bearerToken? bearerToken.replace("Bearer ",""):"";
    return token;
}

export default authenticate;