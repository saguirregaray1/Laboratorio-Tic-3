import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriviaQuestionController } from '../controllers/trivia.controller';
import { TriviaQuestion } from '../entities/trivia_question.entity';
import { TriviaQuestionService } from '../services/trivia_question.service';

@Module({
  imports: [TypeOrmModule.forFeature([TriviaQuestion])],
  controllers: [TriviaQuestionController],
  providers: [TriviaQuestionService],
})
export class TriviaQuestionModule {}
