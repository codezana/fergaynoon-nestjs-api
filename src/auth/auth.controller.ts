import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles('admin')
  @Post('register')
  async register(@Body() input: RegisterDto) {
    try{
    const result= this.authService.register(input);

    return {
      message:(await result).message,
      data:(await result).user
    }
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(@Body() input: LoginDto) {
    const user = await this.authService.validateUser(input.username, input.password);
    if (!user) throw new UnauthorizedException('ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە');
    return this.authService.login(user); // returns JWT
  }
}
