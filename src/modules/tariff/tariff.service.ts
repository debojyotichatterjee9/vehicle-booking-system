import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FixedTariff } from './tarriff.entity';
import { VehicleCategory } from '../vehicles/vehicles.entity';

@Injectable()
export class TariffService {
    constructor(
        @InjectRepository(FixedTariff) private fixedTariffRepository: Repository<FixedTariff>,
        @InjectRepository(VehicleCategory) private vehicleCatgRepository: Repository<VehicleCategory>
    ) { }

    async createFixedTariff(payload: Partial<FixedTariff>) {
        const vehicleCategory = await this.vehicleCatgRepository.findOneBy({ id: payload.vehicleCategoryId });
        if (!vehicleCategory) {
            throw new Error("This category does not Exist!!!")
        }
        Object.assign(payload, { vehicleCategories: [vehicleCategory] });
        const fixedTariff = this.fixedTariffRepository.create(payload);

        const fixedTariffInfo = await this.fixedTariffRepository.save(fixedTariff);
        return ({
            id: fixedTariffInfo.id
        });
    }

    async listFixedTariff() {
        return this.fixedTariffRepository.find({
            where: { isEnabled: true }, relations: {
                vehicleCategories: true,
            }
        });
    }

    async detailFixedTariff(payload: Partial<FixedTariff>) {
        const resp =  await this.fixedTariffRepository.find({
            where: {
                fromLocation: payload.fromLocation,
                toLocation: payload.toLocation,
                isEnabled: true,
            },
            relations: {
                vehicleCategories: true,
            },
        });
        console.log(resp)
        return resp
    }
}
