import { IsString ,IsUUID, IsUrl, IsNumber } from "class-validator";

export class createFixedTariffDto {
@IsUUID()    
fromLocation: string;
@IsUUID()
toLocation: string
@IsUUID()
vehicleCategoryId: string
@IsNumber()
tariff: number
}