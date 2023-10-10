import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Duel } from '../entities/duel.entity';
import { Repository } from 'typeorm';
import { QuestionService } from './question.service';
import { CreateDuelDto } from '../dtos/CreateDuelDto';
import { UserService } from './user.service';
import { DuelAnswerQuestionDto } from '../dtos/DuelAnswerQuestionDto';
import { DuelGateway } from '../controllers/duel.gateway';

@Injectable()
export class DuelService {
  constructor(
    @InjectRepository(Duel)
    private readonly duelRepository: Repository<Duel>,
    private readonly questionService: QuestionService,
    private readonly userService: UserService,
    private readonly gateway: DuelGateway,
  ) {}

  async createDuel(createDuelDto: CreateDuelDto): Promise<Duel> {
    const player1 = await this.userService.getUser(createDuelDto.player1Id);
    const player2 = await this.userService.getUser(createDuelDto.player2Id);

    if (!player1 || !player2) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const questions = await this.questionService.getRandomQuestions(
      createDuelDto.rounds,
    );

    const duel = this.duelRepository.create({
      player1,
      player2,
      questions,
      rounds: createDuelDto.rounds,
      currentRound: 1,
      player1Score: 0,
      player2Score: 0,
      winner: null,
    });
    return this.duelRepository.save(duel);
  }

  async getDuel(id: number): Promise<Duel> {
    const question = await this.duelRepository.findOne({ where: { id } });
    if (!question) {
      throw new HttpException('Duel not found', HttpStatus.NOT_FOUND);
    }
    return question;
  }

  async answerQuestion(
    duelAnswerQuestionDto: DuelAnswerQuestionDto,
  ): Promise<boolean> {
    const duel = await this.getDuel(duelAnswerQuestionDto.duelId);
    const question = duel.questions.find(
      (q) => q.id === duelAnswerQuestionDto.questionId,
    );

    if (!question) {
      throw new NotFoundException(
        `Question ${duelAnswerQuestionDto.questionId} not found in duel ${duelAnswerQuestionDto.duelId}`,
      );
    }
    const is_correct = question.answer === duelAnswerQuestionDto.answer;
    if (is_correct) {
      if (duelAnswerQuestionDto.playerId === duel.player1.id) {
        duel.player1Score++;
      } else if (duelAnswerQuestionDto.playerId === duel.player2.id) {
        duel.player2Score++;
      }
    }
    await this.duelRepository.save(duel);
    return is_correct;
  }

  async endRound(duelId: number): Promise<boolean> {
    const duel = await this.getDuel(duelId);
    if (duel.currentRound >= duel.rounds) {
      duel.winner =
        duel.player1Score > duel.player2Score
          ? duel.player1.id
          : duel.player2.id;
      await this.duelRepository.save(duel);
      return true;
    } else {
      duel.currentRound++;
      await this.duelRepository.save(duel);
      return false;
    }
  }

  async sendUpdate(duelId: number, update: any) {
    const duel = await this.getDuel(duelId);
    this.gateway.server.to(duelId.toString()).emit('update', update);
  }
}
