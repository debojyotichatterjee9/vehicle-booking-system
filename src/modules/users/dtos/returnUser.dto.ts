import { Expose } from "class-transformer";

export class ReturnUserDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    email: string;
}