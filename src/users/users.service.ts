import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException()
        }
        Object.assign(user, updateUserDto)
        return await this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException()
        }
        return await this.usersRepository.remove(user);
    }
}
