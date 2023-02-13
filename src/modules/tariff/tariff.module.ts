import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffController } from './tariff.controller';
import { TariffService } from './tariff.service';
import { FixedTariff } from './tarriff.entity';
import { VehicleCategory } from '../vehicles/vehicles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FixedTariff, VehicleCategory])],
    controllers:[TariffController],
    providers: [TariffService],
})
export class TariffModule {}
