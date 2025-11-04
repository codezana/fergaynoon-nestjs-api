// src/social-media/social-media.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './entities/about.entity';
import { SocialMedia } from './entities/social-media.entity';
import { UpdateSocialMediaDto } from './dto/update-soical.dto';
import { CreateSocialMediaDto } from './dto/create-soical.dto';

@Injectable()
export class SocialMediaService {
    constructor(
        @InjectRepository(SocialMedia)
        private readonly socialMediaRepository: Repository<SocialMedia>,
        @InjectRepository(About)
        private aboutRepository: Repository<About>,
    ) { }


    async create(input: CreateSocialMediaDto) {
        // 1. Find the social
        const about = await this.aboutRepository.findOne({ where: { id: input.aboutId } });
        if (!about) {
            throw new NotFoundException(`دەربارەی داواکراو نەدۆزرایەوە`);
        }
        const social = this.socialMediaRepository.create({
            ...input,
            about,
        });
        const saved = await this.socialMediaRepository.save(social);
        return {
            message: 'سۆشیال بە سەرکەوتوویی دروستکرا',
            data: saved,
        };
    }

    async findAll() {
        return this.socialMediaRepository.find({
            order: {
                id: 'ASC'
            }
        });
    }

    async findOne(id: number) {
        const social = await this.socialMediaRepository.findOne({
            where: { id },
            order: {
                id: 'ASC'
            }
        });
        if (!social) {
            throw new NotFoundException(`سۆشیالی داواکراو نەدۆزرایەوە`);
        }
        return social;
    }

    async update(id: number, input: UpdateSocialMediaDto
    ) {
        const social = await this.findOne(id);
        Object.assign(social, input);
        // If socialId is updated and you want to update the associated social's title in the about:
        if (input.aboutId && input.aboutId !== social.about?.id) {
            const newsocial = await this.aboutRepository.findOne({ where: { id: input.aboutId } });
            if (!newsocial) {
                throw new NotFoundException('سۆشیالی داواکراو نەدۆزرایەوە');
            }
            social.about = newsocial;
        }
        const saved = await this.socialMediaRepository.save(social);
        return {
            message: 'سۆشیال بە سەرکەوتوویی نوێکرایەوە',
            data: saved,
        };
    }

    async remove(id: number) {
        const social = await this.findOne(id);

        await this.socialMediaRepository.remove(social);
        return {
            message: 'سۆشیال بە سەرکەوتوویی سڕایەوە'
        };
    }

}
