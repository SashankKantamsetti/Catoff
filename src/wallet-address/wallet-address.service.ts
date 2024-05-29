import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './entities/wallet-address.entity';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WalletAddressService {
    constructor(
        @InjectRepository(WalletAddress)
        private walletAddressRepository: Repository<WalletAddress>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createWalletAddressDto: CreateWalletAddressDto): Promise<WalletAddress> {
        const user = await this.userRepository.findOneBy({ id: createWalletAddressDto.userId });
        if (!user) {
            throw new NotFoundException(`User with ID ${createWalletAddressDto.userId} not found`);
        }

        const walletAddress = this.walletAddressRepository.create({
            ...createWalletAddressDto,
            user,
        });
        return this.walletAddressRepository.save(walletAddress);
    }

    findAll(): Promise<WalletAddress[]> {
        return this.walletAddressRepository.find({ relations: ['user'] });
    }

    findOne(id: number): Promise<WalletAddress> {
        return this.walletAddressRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }

    async update(id: number, updateWalletAddressDto: Partial<CreateWalletAddressDto>): Promise<void> {
        const walletAddress = await this.walletAddressRepository.findOneBy({ id });
        if (!walletAddress) {
            throw new NotFoundException(`WalletAddress with ID ${id} not found`);
        }

        if (updateWalletAddressDto.userId) {
            const user = await this.userRepository.findOneBy({ id: updateWalletAddressDto.userId });
            if (!user) {
                throw new NotFoundException(`User with ID ${updateWalletAddressDto.userId} not found`);
            }
            walletAddress.user = user;
        }

        if (updateWalletAddressDto.address) {
            walletAddress.address = updateWalletAddressDto.address;
        }

        await this.walletAddressRepository.save(walletAddress);
    }

    async remove(id: number): Promise<void> {
        const result = await this.walletAddressRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`WalletAddress with ID ${id} not found`);
        }
    }
}
