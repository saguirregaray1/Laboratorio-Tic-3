import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { Question, QuestionSchema } from '../schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [MongooseModule],
})
export class QuestionModule {}
