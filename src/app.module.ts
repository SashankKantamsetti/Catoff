import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { WalletAddressService } from './wallet-address/wallet-address.service';
import { Pool } from 'pg';

/*@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Catoff',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    WalletAddressModule,
  ]
})
export class AppModule { }*/


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
    }),
    UsersModule,
    WalletAddressModule,
  ]
})
export class AppModule { }

