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
import { WsException } from '@nestjs/websockets';

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
    const owner = await this.userService.getUser(createDuelDto.ownerId);

    if (!owner) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const questions = await this.questionService.getRandomQuestions(
      createDuelDto.rounds,
    );

    const duel = this.duelRepository.create({
      owner: owner,
      questions,
      rounds: createDuelDto.rounds,
    });
    return this.duelRepository.save(duel);
  }

  async getDuel(id: string): Promise<Duel> {
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
      duel.playerScores[duelAnswerQuestionDto.playerId] += 1;
    }
    await this.duelRepository.save(duel);
    return is_correct;
  }

  async checkAnswerAndUpdate(duelId: string, answer: string, clientId: string) {
    const duel = await this.getDuel(duelId);
    const question = duel.questions[duel.currentRound];
    const [is_correct, ans] = await this.questionService.checkAnswer(
      question.id,
      answer,
    );

    if (is_correct) {
      duel.playerScores[clientId] += 1;
    }
    await this.duelRepository.save(duel);
    return is_correct;
  }

  async getNextQuestion(duelId: string): Promise<string> {
    const duel = await this.getDuel(duelId);
    if (!duel) {
      throw new WsException('Duel not found');
    }
    duel.currentRound++;
    await this.duelRepository.save(duel);
    const question = duel.questions[duel.currentRound];
    return question.body;
  }

  async endRound(duelId: string): Promise<string> {
    const duel = await this.getDuel(duelId);
    if (duel.currentRound >= duel.rounds) {
      duel.winner = duel.owner.id;
      duel.players.forEach((player) => {
        if (duel.playerScores[player.id] > duel.playerScores[duel.winner]) {
          duel.winner = player.id;
        }
      }, duel);
      await this.duelRepository.save(duel);
      return null;
    } else {
      duel.currentRound++;
      await this.duelRepository.save(duel);
      return duel.questions[duel.currentRound].body;
    }
  }

  async getWinner(duelId: string): Promise<number> {
    const duel = await this.getDuel(duelId);
    return duel.winner;
  }
}
