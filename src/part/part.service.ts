import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from 'src/levels/entities/level.entity';
import { Part } from './entities/part.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) { }

  async create(input: CreatePartDto) {
    const part = this.partRepository.create(input);
    const saved = await this.partRepository.save(part);
    return {
      message: 'بەش بە سەرکەوتوویی دروستکرا',
      data: saved,
    };
  }

  async findAll() {
    return this.partRepository.find({
      relations: [
        'levels',
        'levels.questions',
        'levels.questions.choices'
      ]
    });
  }

  async findOne(id: number) {
    const part = await this.partRepository.findOne({
      where: { id },
      relations: [
        'levels',
        'levels.questions',
        'levels.questions.choices'
      ]
    });
    if (!part) {
      throw new NotFoundException(`بەشی داواکراو نەدۆزرایەوە`);
    }
    return part;
  }

  async update(id: number, input: UpdatePartDto) {
    const part = await this.findOne(id);
    Object.assign(part, input);
    const saved = await this.partRepository.save(part);
    return {
      message: 'بەش بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }

  async remove(id: number) {
    const part = await this.findOne(id);
    const levels = await this.levelRepository.count({ where: { part: { id } } });

    if (levels > 0) {
      return {
        message: 'ناتوانرێت ئەم بەشە بسڕدرێت چونکە ئاست لەسەری دروستکراوە'
      };
    }

    await this.partRepository.remove(part);
    return {
      message: 'بەش بە سەرکەوتوویی سڕایەوە'
    };
  }
}
