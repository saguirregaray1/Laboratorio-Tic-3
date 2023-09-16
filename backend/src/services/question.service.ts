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

  async createQuestion(video: Object): Promise<Question> {
    const newVideo = new this.questionModel(video);
    return newVideo.save();
  }

  async getQuestion(id): Promise<any> {
    if (id.id) {
      return this.questionModel
        .findOne({ _id: id.id })
        .populate('createdBy')
        .exec();
    }
    return this.questionModel.find().populate('createdBy').exec();
  }

  async updateQuestion(id, question: Question): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(id, question, {
      new: true,
    });
  }

  async deleteQuestion(id): Promise<any> {
    return await this.questionModel.findByIdAndRemove(id);
  }
}
