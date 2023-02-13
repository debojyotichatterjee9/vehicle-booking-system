import { IsString ,IsUUID, IsUrl, IsNumber } from "class-validator";

export class createVehicleTypeDto {
@IsString()    
typeName: string;
@IsUrl()
imageUrl: string
@IsNumber()
adultSeatCount: number
@IsNumber()
childSeatCount: number
@IsNumber()
luggageCount: number
}