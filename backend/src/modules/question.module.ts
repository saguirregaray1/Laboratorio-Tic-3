import { Module } from '@nestjs/common';
import { HistoryController } from '../controllers/history.controller';
import { HistoryService } from '../services/history.service';
import { Question } from '../entities/question.entity';
import { World } from '../entities/world.entity';
import { Galaxy } from '../entities/galaxy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalaxyService } from '../services/galaxy.service';
import { WorldService } from '../services/world.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, World, Galaxy])],
  controllers: [HistoryController],
  providers: [HistoryService, GalaxyService, WorldService],
})
export class QuestionModule {}
