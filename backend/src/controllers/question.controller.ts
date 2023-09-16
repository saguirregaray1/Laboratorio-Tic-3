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
    const newVideo = await this.questionService.createQuestion(requestBody);
    return response.status(HttpStatus.CREATED).json({
      newVideo,
    });
  }

  /* @Get('/:id')
  async get(@Res() response, @Param('id') id) {
    return this.questionService.getQuestion(id);
  }
*/
  @Get()
  async get() {
    return HttpStatus.OK;
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
