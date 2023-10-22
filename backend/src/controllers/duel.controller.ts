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
  UseGuards,
} from '@nestjs/common';
import { CreateDuelDto } from '../dtos/CreateDuelDto';
import { DuelService } from '../services/duel.service';
import { DuelAnswerQuestionDto } from '../dtos/DuelAnswerQuestionDto';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
@Controller('/api/v1/duel')
@UseGuards(RolesGuard)
export class DuelController {
  constructor(private readonly duelService: DuelService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin'])
  async createDuel(@Res() response, @Body() createDuelDto: CreateDuelDto) {
    try {
      console.log(createDuelDto);
      const newDuel = await this.duelService.createDuel(createDuelDto);
      return response.status(HttpStatus.CREATED).json({
        newDuel,
      });
    } catch (HttpException) {
      console.log('HOLAAAAAA')
      console.log(HttpException.status)
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get(':id')
  @Roles(['user', 'admin'])
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
}
