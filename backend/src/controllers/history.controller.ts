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
import { CreateGalaxyDto } from '../dtos/CreateGalaxyDto';
import { CreateQuestionDto } from '../dtos/CreateQuestionDto';
import { CreateWorldDto } from '../dtos/CreateWorldDto';
import { GalaxyService } from '../services/galaxy.service';
import { HistoryService } from '../services/history.service';
import { WorldService } from '../services/world.service';
import { json } from 'stream/consumers';

@Controller('/api/v1/history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly worldService: WorldService,
    private readonly galaxyService: GalaxyService,
  ) {}

  @Post('/create/question')
  @UsePipes(ValidationPipe)
  async createQuestion(@Res() response, @Body() question: CreateQuestionDto) {
    const newQuestion = await this.historyService.createQuestion(question);
    return response.status(HttpStatus.CREATED).json({
      newQuestion,
    });
  }

  @Post('/create/world')
  @UsePipes(ValidationPipe)
  async createWorld(@Res() response, @Body() world: CreateWorldDto) {
    const newWorld = await this.worldService.createWorld(world);
    return response.status(HttpStatus.CREATED).json({
      newWorld,
    });
  }

  @Post('/create/galaxy')
  @UsePipes(ValidationPipe)
  async createGalaxy(@Res() response, @Body() galaxy: CreateGalaxyDto) {
    const newGalaxy = await this.galaxyService.createGalaxy(galaxy);
    return response.status(HttpStatus.CREATED).json({
      newGalaxy,
    });
  }

  @Get('question/:id')
  async getQuestion(@Res() response, @Param('id') id) {
    const question = await this.historyService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  @Get('world/:id')
  async getWorld(@Res() response, @Param('id') id) {
    const question = await this.historyService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }

  @Get('galaxy/:id')
  async getGalaxy(@Res() response, @Param('id') id) {
    const question = await this.historyService.getQuestion(id);
    return response.status(HttpStatus.ACCEPTED).json({
      question,
    });
  }
}
