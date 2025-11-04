import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('about')
export class AboutController {
  constructor(
    private readonly aboutService: AboutService,
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createAboutDto: CreateAboutDto) {
    try {
      const result = await this.aboutService.create(createAboutDto);
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get()
  findAll() {
    return this.aboutService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    try {
      const result = await this.aboutService.update(+id, updateAboutDto);
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.aboutService.remove(+id);
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
