import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { Part } from './entities/part.entity';
import { Level } from 'src/levels/entities/level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Part,Level])],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
