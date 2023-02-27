import { IsString } from "class-validator";

export class signInUserDto {
    @IsString()
    email: string;
    @IsString()
    password: string;
}