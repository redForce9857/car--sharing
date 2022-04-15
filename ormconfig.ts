import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export const DB_CONFIG: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
}