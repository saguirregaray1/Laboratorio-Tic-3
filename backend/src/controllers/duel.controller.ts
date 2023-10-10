// duel.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDuelDto } from '../dtos/CreateDuelDto';
import { DuelService } from '../services/duel.service';
import { DuelAnswerQuestionDto } from '../dtos/DuelAnswerQuestionDto';
@Controller('duels')
export class DuelController {
  constructor(private readonly duelService: DuelService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createDuel(@Res() response, @Body() createDuelDto: CreateDuelDto) {
    try {
      const newDuel = await this.duelService.createDuel(createDuelDto);
      return response.status(HttpStatus.CREATED).json({
        newDuel,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get(':id')
  async getDuel(@Res() response, @Param('id') id) {
    try {
      const duel = await this.duelService.getDuel(id);
      return response.status(HttpStatus.OK).json({
        duel,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/answer')
  async answerQuestion(
    @Res() response,
    @Body() duelAnswerQuestionDto: DuelAnswerQuestionDto,
  ) {
    try {
      const newDuel = await this.duelService.answerQuestion(
        duelAnswerQuestionDto,
      );
      return response.status(HttpStatus.OK).json({
        newDuel,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }
}
