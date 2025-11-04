import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }


  async register(register: RegisterDto) {
    const hash = await bcrypt.hash(register.password, 10);

    const user = this.userRepo.create({
      username: register.username,
      password: hash,
    });

    await this.userRepo.save(user);

    return {
      message: 'بەکارهێنەر بە سەرکەوتوویی تۆمارکرا',
      user
    }
  }


  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);


    if (isMatch) return user;

    return null;
  }


  async login(user: User) {
    const payload = { sub: user.id, email: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

// ✅ Handles user registration, login, hashing, token generation.