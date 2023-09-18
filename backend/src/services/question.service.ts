import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { Request, Response } from 'express';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async createQuestion(question: Object): Promise<Question> {
    const newQuestion = new this.questionModel(question);
    return newQuestion.save();
  }

  async getQuestion(id): Promise<any> {
    if (id) {
      return this.questionModel.findOne({ _id: id }).exec();
    }
    return this.questionModel.find().exec();
  }

  async updateQuestion(id, question: Question): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(id, question, {
      new: true,
    });
  }

  async deleteQuestion(id): Promise<any> {
    return await this.questionModel.findByIdAndRemove(id);
  }

  async playTrivia(category: string): Promise<any> {
    const filter = category !== undefined ? { category: category } : {};
    const questions = await this.questionModel.find(filter).exec();
    console.log(questions);
    const shuffle = (array: QuestionDocument[]) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const shuffledArray = shuffle(questions).slice(0, 3);
    console.log(shuffledArray);
    return shuffledArray;
  }
}
