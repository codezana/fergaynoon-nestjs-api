import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { SocialMediaService } from './social.service';
import { CreateSocialMediaDto } from './dto/create-soical.dto';
import { UpdateSocialMediaDto } from './dto/update-soical.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('social')
export class SocialController {
  constructor(
    private readonly socialMediaService: SocialMediaService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() input: CreateSocialMediaDto) {
    try {
      const result = await this.socialMediaService.create(input);
      return {
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll() {
    return await this.socialMediaService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: number) {
    return await this.socialMediaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: number, @Body() input: UpdateSocialMediaDto) {
    try {
      const result = await this.socialMediaService.update(id, input);
      return {
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: number) {
    try {
      const result = await this.socialMediaService.remove(id);
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
