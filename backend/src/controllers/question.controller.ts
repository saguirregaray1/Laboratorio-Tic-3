import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
  Put,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Question } from '../schemas/question.schema';
import { QuestionService } from '../services/question.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { json } from 'stream/consumers';

@Controller('/api/v1/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Res() response,
    @Req() request,
    @Body() question: Question,
  ) {
    const requestBody = {
      createdBy: request.user,
      question: question.body,
      answer: question.answer,
      type: question.type,
    };
    const newQuestion = await this.questionService.createQuestion(question);
    return response.status(HttpStatus.CREATED).json({
      newQuestion,
    });
  }

  @Get('/:id')
  async get(@Res() response, @Param('id') id) {
    const question = await this.questionService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  @Get('/play/trivia')
  async trivia(@Res() response, @Body('category') category: string) {
    const questions = await this.questionService.playTrivia(category);
    return response.status(HttpStatus.ACCEPTED).json({
      questions,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() question: Question) {
    const updatedVideo = await this.questionService.updateQuestion(
      id,
      question,
    );
    return response.status(HttpStatus.OK).json(updatedVideo);
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    await this.questionService.deleteQuestion(id);
    return response.status(HttpStatus.OK).json({
      user: null,
    });
  }
}
