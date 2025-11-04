// users/users.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UpdateUsersDto } from './update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async onModuleInit() {
    const adminExists = await this.userRepo.findOne({ where: { username: 'admin' } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin@admin', 10); // Change to strong pass in prod
      const admin = this.userRepo.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await this.userRepo.save(admin);
    }
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    // Check if id is provided
    if (!id) {
      throw new BadRequestException('ئایدی بەکارهێنەر پێویستە');
    }

    // Find user by id
    const user = await this.userRepo.findOneBy({ id });

    // Check if user exists
    if (!user) {
      throw new NotFoundException('بەکارهێنەر نەدۆزرایەوە');
    }

    return user;
  }


  async update(id: number, input: UpdateUsersDto) {
    const user = await this.findOne(id);

    if (input.username) {
      user.username = input.username;
    }

    if (input.password) {
      user.password = await bcrypt.hash(input.password, 10);
    } else if (input.reset === 1) {
      user.password = await bcrypt.hash('12345678@ferga', 10);
    }

    await this.userRepo.save(user);

    return {
      message: 'بەکارهێنەر بە سەرکەوتوویی نوێکرایەوە',
    };
  }



  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('بەکارهێنەر نەدۆزرایەوە');
    }

    await this.userRepo.remove(user);

    return {
      message: 'بەکارهێنەر بە سەرکەوتوویی سڕایەوە',
    };
  }

}

// ✅ User service with method to find all users.