import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';
import { WalletAddress } from './entities/wallet-address.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress, User]),
    UsersModule],
  providers: [WalletAddressService],
  controllers: [WalletAddressController],
  exports: [WalletAddressService]
})
export class WalletAddressModule { }
