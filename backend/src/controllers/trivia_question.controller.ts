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
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateTriviaQuestionDto } from 'src/dtos/CreateTriviaQuestionDto';
import { TriviaQuestion } from 'src/entities/trivia_question.entity';
import { TriviaQuestionService } from 'src/services/trivia_question.service';
import { json } from 'stream/consumers';

@Controller('/api/v1/trivia_question')
export class TriviaQuestionController {
  constructor(private readonly triviaQuestionService: TriviaQuestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createQuestion(@Res() response, @Body() question: CreateTriviaQuestionDto){
    const newQuestion = await this.triviaQuestionService.createQuestion(question);
    return response.status(HttpStatus.CREATED).json({
      newQuestion,
    });
  }

  @Get('/:id')
  async get(@Res() response, @Param('id') id) {
    const question = await this.triviaQuestionService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  // @Get('/play/trivia')
  // async getTrivia(@Res() response, @Body('category') category: string) {
  //   const questions = await this.questionService.playTrivia(category);
  //   return response.status(HttpStatus.ACCEPTED).json({
  //     questions,
  //   });
  // }

  // /*@Post('/play/trivia')
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

  @Post('/play/trivia')
  async check(@Res() response, @Body('answer') answer, @Body('id') id: string){
    const json = await this.triviaQuestionService.isCorrect(answer, id);
    return response.status(HttpStatus.OK).json({
      is_correct : json.is_correct,
      answer : json.answer
    }) 
  }

}
