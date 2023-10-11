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
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateTriviaQuestionDto } from '../dtos/CreateTriviaQuestionDto';
import { TriviaQuestion } from '../entities/trivia_question.entity';
import { TriviaQuestionService } from '../services/trivia_question.service';
import { json } from 'stream/consumers';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';

@Controller('/api/v1/trivia')
@UseGuards(RolesGuard)
export class TriviaQuestionController {
  constructor(private readonly triviaQuestionService: TriviaQuestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin']) //fix
  async createQuestion(
    @Res() response,
    @Body() question: CreateTriviaQuestionDto,
  ) {
    const newQuestion =
      await this.triviaQuestionService.createQuestion(question);
    return response.status(HttpStatus.CREATED).json({
      newQuestion,
    });
  }

  @Get('/id/:id')
  async get(@Res() response, @Param('id') id) {
    const question = await this.triviaQuestionService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  @Post('/play')
  async getTrivia(
    @Res() response,
    @Body('universe') universe: string,
    @Body('galaxy') galaxy: string,
  ) {
    const question = await this.triviaQuestionService.playTrivia(
      universe,
      galaxy,
    );
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  // /*@Post('/play')
  // async playTrivia(@Res() response, @Body('category') category: string) {
  //   const questions = await this.questionService.playTrivia(category);
  //   return response.status(HttpStatus.ACCEPTED).json({
  //     questions,
  //   });
  // } */

  // @Put('/:id')
  // async update(@Res() response, @Param('id') id, @Body() question: Question) {
  //   const updatedVideo = await this.questionService.updateQuestion(
  //     id,
  //     question,
  //   );
  //   return response.status(HttpStatus.OK).json(updatedVideo);
  // }

  // @Delete('/:id')
  // async delete(@Res() response, @Param('id') id) {
  //   await this.questionService.deleteQuestion(id);
  //   return response.status(HttpStatus.OK).json({
  //     user: null,
  //   });
  // }

  @Post('/play/check')
  async check(@Res() response, @Body('answer') answer, @Body('id') id: string) {
    const json = await this.triviaQuestionService.isCorrect(answer, id);
    return response.status(HttpStatus.OK).json({
      is_correct: json.is_correct,
      answer: json.answer,
    });
  }

  /*@Post('/play/results')
  async saveResults(@Res() response, @Body('answer') answer, @Body('id') id: string) {
    const json = await this.triviaQuestionService.isCorrect(answer, id);
    return response.status(HttpStatus.OK).json({
      is_correct: json.is_correct,
      answer: json.answer,
    });
  } */
}
