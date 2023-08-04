import { IsEmail, IsNotEmpty, IsString, Validate, ValidateNested} from "class-validator";
import { isStringLiteral } from "typescript";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:Address;

    @IsNotEmpty()
    @IsString()
    password:string
}

export default CreateEmployeeDto;