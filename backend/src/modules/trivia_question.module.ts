import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriviaQuestionController } from 'src/controllers/trivia_question.controller';
import { TriviaQuestion } from 'src/entities/trivia_question.entity';
import { TriviaQuestionService } from 'src/services/trivia_question.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([TriviaQuestion]),
  ],
  controllers: [TriviaQuestionController],
  providers: [TriviaQuestionService],
})
export class TriviaQuestionModule {}
