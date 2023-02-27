import { IsString, IsUUID, UUIDVersion } from "class-validator";

export class createUserDto {
    @IsUUID()
    roleId: string;
    @IsString()
    firstName: string
    @IsString()
    middleName: string
    @IsString()
    lastName: string
    @IsString()
    email: string
    @IsString()
    username: string
    @IsString()
    password: string
}