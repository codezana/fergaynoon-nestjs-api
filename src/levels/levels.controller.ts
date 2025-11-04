import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createLevel(@Body() input: CreateLevelDto) {
    try {
      const result = await this.levelsService.create(input);
      return {
        message: result.message,
        data: result.data
      }
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.levelsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.levelsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateLevel(@Param('id',ParseIntPipe) id: number, @Body() input: UpdateLevelDto) {
    try {
      const result = await this.levelsService.update(id, input);
      return {
        message: result.message,
        data: result.data
      }
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async removeLevel(@Param('id',ParseIntPipe) id: number) {
    try {
      const result = await this.levelsService.remove(id);
      return {
        message: result.message
      }
    } catch (error) {
      return {
        message:error.message,
      };
    }
  }
}
