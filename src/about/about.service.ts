import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './entities/about.entity';
import { SocialMedia } from './entities/social-media.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
    @InjectRepository(SocialMedia)
    private socialRepository: Repository<SocialMedia>,
  ) { }

  async create(input: CreateAboutDto) {
    const about = this.aboutRepository.create(input);
    const saved = await this.aboutRepository.save(about);

    return {
      message: 'دەربارە بە سەرکەوتوویی دروستکرا',
      data: saved,
    }
  }

  async findAll() {
    return this.aboutRepository.find({
      relations: ['social'],
    });
  }
  

  async findOne(id: number) {
    const about = await this.aboutRepository.findOne({
      where: {
        id: id
      },
      relations: ['social'],
      order: {
        id: 'ASC'
      }
    });
    if (!about) {
      throw new NotFoundException(`دەربارەی داواکراو نەدۆزرایەوە`);
    }
    return about;
  }

  async update(id: number, updateaboutInput: UpdateAboutDto) {
    const about = await this.findOne(id);
    Object.assign(about, updateaboutInput);
    const saved = await this.aboutRepository.save(about);
    return {
      message: 'دەربارە بە سەرکەوتوویی نوێکرایەوە',
      data: saved,
    };
  }



  async remove(id: number) {
    const about = await this.findOne(id);
    const social = await this.aboutRepository.count({ where: { social: { id } } });

    if (social > 0) {
      return {
        message: 'ناتوانرێت ئەم دەربارەیە بسڕدرێت چونکە سۆشیال لەسەری دروستکراون'
      };
    }

    await this.aboutRepository.remove(about);
    return {
      message: 'دەربارە بە سەرکەوتوویی سڕایەوە'
    };
  }
}
