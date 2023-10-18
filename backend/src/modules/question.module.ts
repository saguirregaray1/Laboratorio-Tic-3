import { Module } from '@nestjs/common';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { Question } from '../entities/question.entity';
import { World } from '../entities/world.entity';
import { Galaxy } from '../entities/galaxy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalaxyService } from '../services/galaxy.service';
import { WorldService } from '../services/world.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, World, Galaxy])],
  controllers: [QuestionController],
  providers: [QuestionService, GalaxyService, WorldService],
  exports: [QuestionService],
})
export class QuestionModule {}
