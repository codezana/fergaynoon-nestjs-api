// users/users.resolver.ts
import { Controller, Body, UseGuards, Get, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { UpdateUsersDto } from './update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUsersDto
  ) {
    try {
      const result = await this.usersService.update(id, updateUserDto);
      return { message: result.message };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.usersService.remove(id);

      return {
        message: result.message,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}

// ✅ A protected query to return all users (for admin).