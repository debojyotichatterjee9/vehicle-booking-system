import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehicleCategory, VehicleType } from './vehicles.entity';
@Module({
    imports: [TypeOrmModule.forFeature([VehicleCategory, VehicleType])],
    controllers:[VehiclesController],
    providers: [VehiclesService],
})
export class VehiclesModule {}
