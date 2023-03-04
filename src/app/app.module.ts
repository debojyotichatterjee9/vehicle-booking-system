import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "../modules/users/users.module";
import { VehiclesModule } from "../modules/vehicles/vehicles.module";
import { TariffModule } from "src/modules/tariff/tariff.module";
import { User } from "src/modules/users/users.entity";
import { VehicleCategory, VehicleType } from "src/modules/vehicles/vehicles.entity";
import { FixedTariff } from "src/modules/tariff/tarriff.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get<string>('DB_DRIVER'),
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          cache: {
            duration: config.get<number>('DB_CACHE_DURATION') // keeping cache 30 seconds
          },
          synchronize: config.get<boolean>('DB_SYNC'),
          logging: config.get<string>('DB_LOGGING'),
          entities: [User, VehicleCategory, VehicleType, FixedTariff],
          subscribers: [],
          migrations: [],
        } as TypeOrmModuleOptions
      }
    }),
    //   TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "root",
    //   password: "password",
    //   database: "postgres",
    //   cache: {
    //     duration: 30000 // keeping cache 30 seconds
    //   },
    //   synchronize: true,
    //   logging: true,
    //   entities: [User, VehicleCategory, VehicleType, FixedTariff],
    //   subscribers: [],
    //   migrations: [],
    // }), 
    UsersModule, VehiclesModule, TariffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }