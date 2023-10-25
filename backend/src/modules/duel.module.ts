import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Duel } from '../entities/duel.entity';
import { DuelController } from '../controllers/duel.controller';
import { DuelService } from '../services/duel.service';
import { DuelGateway } from '../controllers/duel.gateway';
import { QuestionModule } from './question.module';
import { UserModule } from './user.module';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';
import { GalaxyService } from '../services/galaxy.service';
import { WorldService } from '../services/world.service';
import { Question } from '../entities/question.entity';
import { World } from '../entities/world.entity';
import { Galaxy } from '../entities/galaxy.entity';
import { User } from '../entities/user.entity';
import { TriviaQuestion } from 'src/entities/trivia_question.entity';
import { TriviaQuestionModule } from './trivia_question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Duel, TriviaQuestion, World, Galaxy, User]),
    TriviaQuestionModule,
    UserModule,
  ],
  controllers: [DuelController],
  providers: [DuelService, DuelGateway],
  exports: [DuelService],
})
export class DuelModule {}
