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
import { QuestionService } from '../services/history.service';
import { WorldService } from '../services/world.service';
import { json } from 'stream/consumers';

@Controller('/api/v1/history')
export class HistoryController {
  constructor(
    private readonly historyService: QuestionService,
    private readonly worldService: WorldService,
    private readonly galaxyService: GalaxyService,
  ) {}

  @Post('/create/question')
  @UsePipes(ValidationPipe)
  async createQuestion(@Res() response, @Body() question: CreateQuestionDto) {
    try {
      const newQuestion = await this.historyService.createQuestion(question);
      return response.status(HttpStatus.CREATED).json({
        newQuestion,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('/create/world')
  @UsePipes(ValidationPipe)
  async createWorld(@Res() response, @Body() world: CreateWorldDto) {
    try {
      const newWorld = await this.worldService.createWorld(world);
      return response.status(HttpStatus.CREATED).json({
        newWorld,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('/create/galaxy')
  @UsePipes(ValidationPipe)
  async createGalaxy(@Res() response, @Body() galaxy: CreateGalaxyDto) {
    try {
      const newGalaxy = await this.galaxyService.createGalaxy(galaxy);
      return response.status(HttpStatus.CREATED).json({
        newGalaxy,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('/question/:id')
  async getQuestion(@Res() response, @Param('id') id) {
    try {
      const question = await this.historyService.getQuestion(id);
      return response.status(HttpStatus.ACCEPTED).json({
        question,
      });
    } catch (error) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json({ message: error.message });
    }
  }

  @Get('/world/:id')
  async getWorld(@Res() response, @Param('id') id) {
    try {
      const world = await this.worldService.getWorld(id);
      return response.status(HttpStatus.ACCEPTED).json({
        world,
      });
    } catch (error) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json({ message: error.message });
    }
  }

  @Get('/galaxy/:id')
  async getGalaxy(@Res() response, @Param('id') id) {
    try {
      const galaxy = await this.galaxyService.getGalaxy(id);
      return response.status(HttpStatus.ACCEPTED).json({
        galaxy,
      });
    } catch (error) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json({ message: error.message });
    }
  }
}
