import {
  HttpException,
  HttpStatus,
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
import { Galaxy } from '../entities/galaxy.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,
    @InjectRepository(Galaxy)
    private readonly galaxyRepository: Repository<Galaxy>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const id = createQuestionDto.worldId;
    const world = await this.worldRepository.findOne({ where: { id } });

    if (!world) {
      throw new HttpException('World not found', HttpStatus.NOT_FOUND);
    }

    const newQuestion = this.questionRepository.create({
      body: createQuestionDto.body,
      answer: createQuestionDto.answer,
      category: createQuestionDto.category,
      type: createQuestionDto.type,
      world: world,
    });

    return this.questionRepository.save(newQuestion);
  }

  async getQuestion(id): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    return question;
  }

  async getQuestionsByWorld(worldId): Promise<Question[]> {
    const world = await this.worldRepository.findOne({
      where: { id: worldId },
    });

    if (!world) {
      throw new HttpException('World not found', HttpStatus.NOT_FOUND);
    }
    const questions = await this.questionRepository.findBy({ world: world });
    return questions;
  }

  async deleteQuestion(id): Promise<any> {
    return await this.questionRepository.delete(id);
  }

  async checkAnswer(id, answer): Promise<any> {
    const question = await this.getQuestion(id);
    return {
      is_correct: question.answer === answer.answer,
      answer: question.answer,
    };
  }

  async getRandomQuestions(numberOfQuestions: number): Promise<any> {
    const questions = await this.questionRepository.find();
    const shuffle = (array: Question[]) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const shuffledArray = shuffle(questions).slice(0, numberOfQuestions);
    const questionArray = shuffledArray.map((item) => {
      return { id: item.id, body: item.body };
    });
    return questionArray;
  }
}
