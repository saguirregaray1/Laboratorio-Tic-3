import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/trivia_question.schema';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { TriviaQuestion } from 'src/entities/trivia_question.entity';
import { Repository } from 'typeorm';
import { CreateTriviaQuestionDto } from 'src/dtos/CreateTriviaQuestionDto';

@Injectable()
export class TriviaQuestionService {
  constructor(
    @InjectRepository(TriviaQuestion) private readonly triviaQuestionRepository: Repository<TriviaQuestion>
  ) {}

  async createQuestion(question: CreateTriviaQuestionDto): Promise<TriviaQuestion> {
    return this.triviaQuestionRepository.save(question);
  }

  async getQuestion(id): Promise<TriviaQuestion> {
    return this.triviaQuestionRepository.findOne({where:{id}});
  }

  // async updateQuestion(id, question: Question): Promise<Question> {
  //   return await this.questionModel.findByIdAndUpdate(id, question, {
  //     new: true,
  //   });
  // }

  // async deleteQuestion(id): Promise<any> {
  //   return await this.questionModel.findByIdAndRemove(id);
  // }

  // async playTrivia(category: string): Promise<any> {
  //   const filter = category !== undefined ? { category: category } : {};
  //   const questions = await this.questionModel.find(filter).exec();
  //   const shuffle = (array: QuestionDocument[]) => {
  //     return array.sort(() => Math.random() - 0.5);
  //   };
  //   const shuffledArray = shuffle(questions).slice(0, 3);
  //   return shuffledArray;
  // }

  async isCorrect(answer:string, id:string){
    const question:TriviaQuestion = await this.getQuestion(id);
    return {'is_correct' : question.answer === answer, 'answer': question.answer};
  }
}
