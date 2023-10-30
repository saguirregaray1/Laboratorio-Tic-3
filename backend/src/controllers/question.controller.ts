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
import { CreateGalaxyDto } from '../dtos/CreateGalaxyDto';
import { CreateQuestionDto } from '../dtos/CreateQuestionDto';
import { CreateWorldDto } from '../dtos/CreateWorldDto';
import { GalaxyService } from '../services/galaxy.service';
import { QuestionService } from '../services/question.service';
import { WorldService } from '../services/world.service';
import { json } from 'stream/consumers';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { CreateQuestionWithTheoremDto } from '../dtos/CreateQuestionWithTheoremDto';
import { CheckAnswerDto } from '../dtos/CheckAnswerDto';

@Controller('/api/v1/history')
@UseGuards(RolesGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly worldService: WorldService,
    private readonly galaxyService: GalaxyService,
  ) {}

  @Post('/create/question')
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin']) //fix
  async createQuestion(@Res() response, @Body() question: CreateQuestionDto) {
    try {
      const newQuestion = await this.questionService.createQuestion(question);
      return response.status(HttpStatus.CREATED).json({
        newQuestion,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/create/questionTheorem')
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin']) //fix
  async createQuestionWithTheorem(
    @Res() response,
    @Body() question: CreateQuestionWithTheoremDto,
  ) {
    try {
      const newQuestion =
        await this.questionService.createQuestionWithTheorem(question);
      return response.status(HttpStatus.CREATED).json({
        newQuestion,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/create/world')
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin']) //fix
  async createWorld(@Res() response, @Body() world: CreateWorldDto) {
    try {
      const newWorld = await this.worldService.createWorld(world);
      return response.status(HttpStatus.CREATED).json({
        newWorld,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/create/galaxy')
  @UsePipes(ValidationPipe)
  @Roles(['user', 'admin']) //fix
  async createGalaxy(@Res() response, @Body() galaxy: CreateGalaxyDto) {
    try {
      const newGalaxy = await this.galaxyService.createGalaxy(galaxy);
      return response.status(HttpStatus.CREATED).json({
        newGalaxy,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/question/:id')
  @Roles(['user', 'admin'])
  async getQuestion(@Res() response, @Param('id') id) {
    try {
      const question = await this.questionService.getQuestion(id);
      question.answer = '';
      return response.status(HttpStatus.ACCEPTED).json({
        question,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/world/:id')
  @Roles(['user', 'admin'])
  async getWorld(@Res() response, @Param('id') id) {
    try {
      const world = await this.worldService.getWorld(id);
      return response.status(HttpStatus.ACCEPTED).json({
        world,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/galaxy/:id')
  @Roles(['user', 'admin'])
  async getGalaxy(@Res() response, @Param('id') id) {
    try {
      const galaxy = await this.galaxyService.getGalaxy(id);
      return response.status(HttpStatus.ACCEPTED).json({
        galaxy,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('galaxies/:universe')
  @Roles(['user', 'admin'])
  async getGalaxiesByUniverse(@Res() response, @Param('universe') universe) {
    try {
      const galaxies = await this.galaxyService.getGalaxiesByUniverse(universe);
      return response.status(HttpStatus.ACCEPTED).json({
        galaxies,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/galaxies')
  @Roles(['user', 'admin'])
  async getGalaxies(@Res() response) {
    try {
      const galaxies = await this.galaxyService.getGalaxies();
      return response.status(HttpStatus.ACCEPTED).json({
        galaxies,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/galaxy/getworlds/:id')
  @Roles(['user', 'admin'])
  async getWorldsByGalaxy(@Res() response, @Param('id') id) {
    try {
      const worlds = await this.worldService.getWorldsByGalaxy(id);
      return response.status(HttpStatus.ACCEPTED).json({
        worlds,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/world/getquestions/:id')
  @Roles(['user', 'admin'])
  async getQuestionsByWorld(@Res() response, @Param('id') id) {
    try {
      const questions = await this.questionService.getQuestionsByWorld(id);
      return response.status(HttpStatus.ACCEPTED).json({
        questions,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Get('/nextQuestion/:id')
  @Roles(['user', 'admin'])
  async getNextQuestion(@Res() response, @Param('id') id) {
    try {
      const question = await this.questionService.getNextQuestion(id);
      return response.status(HttpStatus.ACCEPTED).json({
        question,
      });
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }
}
