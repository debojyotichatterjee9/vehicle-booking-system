import { Controller, Post, Get, Patch, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { createFixedTariffDto } from './dtos/createFixedtariff.dto';
import { locationFixedTariffDto } from './dtos/locationFixedTariff.dto';
import { TariffService } from './tariff.service';

@Controller('tariff')
export class TariffController {
    constructor (private tariffService: TariffService) {

    }

    @Post("/fixed")
    createFixedTariff(@Body() payload: createFixedTariffDto) {
        return this.tariffService.createFixedTariff(payload)
    }

    @Get("/fixed")
    listFixedTariff() {
        return this.tariffService.listFixedTariff()
    }

    @Post("/fixed/location")
    detailFixedTariff( @Body() payload: locationFixedTariffDto) {
        return this.tariffService.detailFixedTariff(payload)
    }
}
