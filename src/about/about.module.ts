import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { SocialMedia } from './entities/social-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([About,SocialMedia])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
