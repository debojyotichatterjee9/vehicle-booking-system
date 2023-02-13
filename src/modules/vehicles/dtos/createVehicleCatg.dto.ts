import { IsString } from "class-validator";

export class createVehicleCatgDto {
@IsString()    
categoryName: string;
}