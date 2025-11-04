// src/social-media/social-media.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaService } from './social.service';
import { AboutModule } from 'src/about/about.module';  
import { About } from './entities/about.entity';
import { SocialMedia } from './entities/social-media.entity';
import { SocialController } from './social.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMedia,About])
  ],
  controllers: [SocialController],
  providers: [SocialMediaService], 
})
export class SocialMediaModule {}
