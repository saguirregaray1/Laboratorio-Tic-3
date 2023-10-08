import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dtos/CreateQuestionDto';
import { World } from '../entities/world.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly historyRepository: Repository<Question>,
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const id = createQuestionDto.worldId;
    const world = await this.worldRepository.findOne({ where: { id } });

    if (!world) {
      throw new Error('World not found');
    }

    const newQuestion = this.historyRepository.create({
      body: createQuestionDto.body,
      answer: createQuestionDto.answer,
      category: createQuestionDto.category,
      type: createQuestionDto.type,
      world: world,
    });

    return this.historyRepository.save(newQuestion);
  }

  async getQuestion(id): Promise<Question> {
    const question = await this.historyRepository.findOne({ where: { id } });
    if (!question) {
      throw new Error('Question not found');
    }
    return question;
  }

  // async updateQuestion(id, question: Question): Promise<Question> {
  //   return await this.questionModel.findByIdAndUpdate(id, question, {
  //     new: true,
  //   });
  // }

  // async deleteQuestion(id): Promise<any> {
  //   return await this.questionModel.findByIdAndRemove(id);
  // }

  /*  async playTrivia(category: string): Promise<any> {
      const filter = category !== undefined ? { category: category } : {}; //If category undefined, search all questions
      const questions = await this.triviaQuestionRepository.findBy(filter);
      const shuffle = (array: TriviaQuestion[]) => {
        return array.sort(() => Math.random() - 0.5);
      };
      const shuffledArray = shuffle(questions).slice(0, 3);
      const questionArray = shuffledArray.map((item) => {return {id : item.id, body : item.body}})
      return questionArray;
    }
  
    async isCorrect(answer:string, id:string){
      const question:TriviaQuestion = await this.getQuestion(id);
      return {'is_correct' : question.answer === answer, 'answer': question.answer};
    }

    */
}
