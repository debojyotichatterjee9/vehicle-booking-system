import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { createFixedTariffDto } from './dtos/createFixedtariff.dto';
import { locationFixedTariffDto } from './dtos/locationFixedTariff.dto';
import { TariffService } from './tariff.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('tariff')
export class TariffController {
    constructor(private tariffService: TariffService) {

    }

    @Post("/fixed")
    @UseGuards(AuthGuard)
    createFixedTariff(@Body() payload: createFixedTariffDto) {
        return this.tariffService.createFixedTariff(payload)
    }

    @Get("/fixed")
    @UseGuards(AuthGuard)
    listFixedTariff() {
        return this.tariffService.listFixedTariff()
    }

    @Post("/fixed/location")
    @UseGuards(AuthGuard)
    detailFixedTariff(@Body() payload: locationFixedTariffDto) {
        return this.tariffService.detailFixedTariff(payload)
    }
}
