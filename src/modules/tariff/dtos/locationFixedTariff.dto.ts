import { IsUUID } from "class-validator";

export class locationFixedTariffDto {
@IsUUID()    
fromLocation: string;
@IsUUID()
toLocation: string
}