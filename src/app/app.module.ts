import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "../modules/users/users.module";
import { VehiclesModule } from "../modules/vehicles/vehicles.module";
import { TariffModule } from "src/modules/tariff/tariff.module";
import { User } from "src/modules/users/users.entity";
import { VehicleCategory, VehicleType } from "src/modules/vehicles/vehicles.entity";
import { FixedTariff } from "src/modules/tariff/tarriff.entity";
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "password",
    database: "postgres",
    cache: {
      duration: 30000 // keeping cache 30 seconds
    },
    synchronize: true,
    logging: true,
    entities: [User, VehicleCategory, VehicleType, FixedTariff],
    subscribers: [],
    migrations: [],
  }), UsersModule, VehiclesModule, TariffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }