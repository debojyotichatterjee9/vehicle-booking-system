import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleCategory, VehicleType } from './vehicles.entity';

@Injectable()
export class VehiclesService {

  constructor(
    @InjectRepository(VehicleCategory) private vehicleCatgRepository: Repository<VehicleCategory>,
    @InjectRepository(VehicleType) private vehicleTypeRepository: Repository<VehicleType>
  ) { }

  async createVehicleCatg(categoryName: string) {
    const vehicleCatg = this.vehicleCatgRepository.create({ categoryName });

    const vehicleCatgInfo = await this.vehicleCatgRepository.save(vehicleCatg);
    return ({
      id: vehicleCatgInfo.id
    });
  }


  findVehicleCatg(name: string) {
    if (!name) {
      return this.vehicleCatgRepository.find()
    }
    return this.vehicleCatgRepository.findBy({ categoryName: ILike(`%${name}%`) })
  }

  findOneVehicleCatg(id: string) {
    return this.vehicleCatgRepository.findOneBy({ id })
  }

  async updateVehicleCatg(id: string, payload: Partial<VehicleCategory>) {
    const vehicleCatgInfo = await this.vehicleCatgRepository.findOneBy({ id });
    if (!vehicleCatgInfo) {
      throw new NotFoundException("This category does not Exist!!!")
    }
    Object.assign(vehicleCatgInfo, payload)
    const updatedVehicleCatg = await this.vehicleCatgRepository.save(vehicleCatgInfo);
    return ({
      id: updatedVehicleCatg.id
    });
  }

  async removeVehicleCatg(id: string) {
    const vehicleCatgInfo = await this.vehicleCatgRepository.findOneBy({ id });
    if (!vehicleCatgInfo) {
      throw new NotFoundException("This category does not Exist!!!")
    }
    const removedVehicleCatg = await this.vehicleCatgRepository.remove(vehicleCatgInfo);
    return ({
      id: removedVehicleCatg.id
    });
  }

  async createVehicleType(categoryId: string, payload: Partial<VehicleType>) {

    const vehicleCategory = await this.vehicleCatgRepository.findOneBy({ id: categoryId });

    if (!vehicleCategory) {
      throw new NotFoundException("This category does not Exist!!!")
    }

    Object.assign(payload, { vehicleCategory });
    const vehicleTypeInstace = this.vehicleTypeRepository.create(payload);

    const vehicleTypeInfo = await this.vehicleTypeRepository.save(vehicleTypeInstace);
    return ({
      id: vehicleTypeInfo.id
    });
  }

  findVehicleType(categoryId: string, name: string) {
    if (!name) {
      return this.vehicleTypeRepository.find({ where: { vehicleCategory: { id: categoryId } } })
    }
    return this.vehicleTypeRepository.find({ where: { vehicleCategory: { id: categoryId }, typeName: ILike(`%${name}%`) } })
  }

  findOneVehicleType(categoryId: string, id: string) {
    // TODO: Need to add validations later
    return this.vehicleTypeRepository.findOneBy({ id })
  }

  async updateVehicleType(categoryId: string, typeId: string, payload: Partial<VehicleType>) {
    const vehicleTypeInfo = await this.vehicleTypeRepository.findOneBy({ id: typeId });
    if (!vehicleTypeInfo) {
      throw new NotFoundException("This category does not Exist!!!")
    }
    Object.assign(vehicleTypeInfo, payload)
    const updatedVehicleType = await this.vehicleTypeRepository.save(vehicleTypeInfo);
    return ({
      id: updatedVehicleType.id
    });
  }

  async removeVehicleType(categoryId: string, typeId: string) {
    const vehicleTypeInfo = await this.vehicleTypeRepository.findOneBy({ id: typeId });
    if (!vehicleTypeInfo) {
      throw new NotFoundException("This category does not Exist!!!")
    }
    const removedVehicleType = await this.vehicleTypeRepository.remove(vehicleTypeInfo);
    return ({
      id: removedVehicleType.id
    });
  }
}
