const createResponse = (data:object,message:string,error:string)=>
{
    const responseObj={
        data:{},
        message:'',
        error:'',
        meta:{}

    }
    responseObj["data"]=data;
    responseObj["message"]=message;
    responseObj["error"]=error;
    responseObj["meta"]={length:data instanceof Array?data.length:1,
                        tot:1};
    return responseObj;
}

export default createResponse;