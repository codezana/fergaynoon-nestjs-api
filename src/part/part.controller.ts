import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Controller('part')
export class PartController {
  constructor(private readonly partsService: PartService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createPartDto: CreatePartDto) {
    try {
      const result = await this.partsService.create(createPartDto);
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updatePartDto: UpdatePartDto) {
    try {
      const result = await this.partsService.update(id, updatePartDto);
      return {
        message: result.message,
        data: result.data
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
  async remove(@Param('id',ParseIntPipe) id: number) {
    try {
      const result = await this.partsService.remove(id);
      return {
        message: result.message
      };
    } catch (error) {
      return {
        message:  error.message,
      };
    }
  }

  @Get()
  findAll() {
    return this.partsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.partsService.findOne(id);
  }
}
