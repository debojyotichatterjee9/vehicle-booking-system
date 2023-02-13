import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { createVehicleCatgDto } from "./dtos/createVehicleCatg.dto";
import { createVehicleTypeDto } from './dtos/createVehicleType.dto';
import { VehiclesService } from './vehicles.service';
@Controller("vehicles")
export class VehiclesController {

  constructor(private vehicleService: VehiclesService) {

  }
  /**
   * CREATE VEHICLE CATEGORY
   * @param payload : Object
   */
  @Post("/category")
  createVehicleCategories(@Body() payload: createVehicleCatgDto) {
    return this.vehicleService.createVehicleCatg(payload.categoryName)
  }

  /**
   * LIST VEHICLE CATEGORIES
   * @param name : String
   * @returns : [Object]
   */
  @Get("/categories")
  listVehicleCategories(@Query("name") name: string) {
    return this.vehicleService.findVehicleCatg(name);
  }

  /**
   * GET VEHICLE CATEGORY DETAILS
   * @param categoryId : String
   * @returns : Object
   */
  @Get("/category/:categoryId")
  detailVehicleCategories(@Param("categoryId") categoryId: string) {
    return this.vehicleService.findOneVehicleCatg(categoryId);
  }

  /**
   * UPDATE VEHICLE CATEGORY
   * @param categoryId : String
   * @param payload : Object
   * @returns : Object
   */
  @Patch("/category/:categoryId")
  updateVehicleCategories(@Param("categoryId") categoryId: string, @Body() payload: createVehicleCatgDto) {
    return this.vehicleService.updateVehicleCatg(categoryId, payload);
  }

  /**
   * SOFT DELETE VEHICLE CATEGORY
   * @param categoryId : String
   * @returns : Object
   */
  @Patch("/category/:categoryId/delete")
  deleteVehicleCategories(@Param("categoryId") categoryId: string) {
    const softDeletepayload = {
      isDeleted: true
    }
    return this.vehicleService.updateVehicleCatg(categoryId, softDeletepayload);
  }

  /**
   * DELETE VEHICLE CATEGORY
   * @param categoryId : String
   * @returns : Object
   */
  @Delete("/category/:categoryId/delete")
  removeVehicleCategories(@Param("categoryId") categoryId: string) {
    return this.vehicleService.removeVehicleCatg(categoryId);
  }



  @Post("/category/:categoryId/type")
  createVehicleTypes(@Param("categoryId") categoryId: string, @Body() payload: createVehicleTypeDto) {
    return this.vehicleService.createVehicleType(categoryId, payload);
  }

  @Get("/category/:categoryId/types")
    listVehicleTypes(@Param("categoryId") categoryId: string, @Query("name") name: string) {
    return this.vehicleService.findVehicleType(categoryId, name);
  }

  @Get("/category/:categoryId/type/:typeId")
  detailVehicleTypes(@Param("categoryId") categoryId: string, @Param("typeId") typeId: string) {
    return this.vehicleService.findOneVehicleType(categoryId, typeId);
  }

  @Patch("/category/:categoryId/type/:typeId")
  updateVehicleType(@Param("categoryId") categoryId: string, @Param("typeId") typeId: string, @Body() payload: createVehicleTypeDto) {
    return this.vehicleService.updateVehicleType(categoryId, typeId, payload);
  }

  @Patch("/category/:categoryId/type/:typeId/delete")
  deleteVehicleType(@Param("categoryId") categoryId: string, @Param("typeId") typeId: string) {
    const softDeletepayload = {
      isDeleted: true
    }
    return this.vehicleService.updateVehicleType(categoryId, typeId, softDeletepayload);
  }

  @Delete("/category/:categoryId/type/:typeId/delete")
  removeVehicleType(@Param("categoryId") categoryId: string, @Param("typeId") typeId: string) {
    return this.vehicleService.removeVehicleType(categoryId, typeId);
  }
}
