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
import { User } from '../entities/user.entity';
import { TriviaQuestion } from '../entities/trivia_question.entity';
import { TriviaQuestionService } from './trivia_question.service';

@Injectable()
export class DuelService {
  constructor(
    @InjectRepository(Duel)
    private readonly duelRepository: Repository<Duel>,
    private readonly triviaQuestionService: TriviaQuestionService,
    private readonly userService: UserService,
  ) {}

  async createDuel(createDuelDto: CreateDuelDto): Promise<Duel> {
    const owner = await this.userService.getUser(createDuelDto.ownerId);
    if (!owner) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const questions = await this.triviaQuestionService.getRandomQuestions(
      createDuelDto.rounds,
      createDuelDto.universe,
      createDuelDto.galaxy,
    );

    const duel = await this.duelRepository.create({
      owner,
      players: [owner],
      questions,
      rounds: createDuelDto.rounds,
      playerScores: {},
    });

    return this.duelRepository.save(duel);
  }

  async getUserFromToken(token): Promise<User> {
    const user = await this.userService.getUserFromToken(token);
    return user;
  }

  async getDuelAndOwnerId(
    id: string,
  ): Promise<{ duelId: string; ownerId: number }> {
    const duel = await this.duelRepository
      .createQueryBuilder('duel')
      .leftJoinAndSelect('duel.owner', 'users')
      .where('duel.id = :id', { id })
      .getOne();

    if (!duel) {
      throw new HttpException('Duel not found', HttpStatus.NOT_FOUND);
    }
    return { duelId: duel.id, ownerId: duel.owner.id };
  }

  async getDuel(id: string): Promise<Duel> {
    const duel = await this.duelRepository
      .createQueryBuilder('duel')
      .leftJoinAndSelect('duel.questions', 'trivia_questions')
      .where('duel.id = :id', { id })
      .getOne();

    if (!duel) {
      throw new HttpException('Duel not found', HttpStatus.NOT_FOUND);
    }

    return duel;
  }

  async getDuelWithPlayers(duelId: string): Promise<Duel> {
    const duel = await this.duelRepository
      .createQueryBuilder('duel')
      .leftJoinAndSelect('duel.players', 'players')
      .where('duel.id = :duelId', { duelId })
      .getOne();
    return duel;
  }

  async checkAnswerAndUpdate(
    duelId: string,
    playerAnswer: string,
    playerId: number,
    answers: Set<string>,
  ): Promise<boolean> {
    const duel = await this.getDuel(duelId);
    const question = duel.questions[duel.currentRound];

    const user = await this.userService.getUser(playerId);

    const { is_correct } = await this.triviaQuestionService.isCorrect(
      playerAnswer,
      question.id.toString(),
    );

    const currentScore = duel.playerScores[user.username] || 0;

    if (is_correct) {
      if (answers.size == 1) {
        duel.playerScores[user.username] = currentScore + 3;
      } else if (answers.size == 2) {
        duel.playerScores[user.username] = currentScore + 2;
      } else {
        duel.playerScores[user.username] = currentScore + 1;
      }
    } else {
      duel.playerScores[user.username] = currentScore;
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

  async endRound(duelId: string): Promise<TriviaQuestion> {
    const duel = await this.getDuel(duelId);
    const duelPlayers = (await this.getDuelWithPlayers(duelId)).players;
    if (duel.currentRound == duel.rounds - 1) {
      duel.winner = duelPlayers[0].username;
      duelPlayers.forEach((player) => {
        if (
          duel.playerScores[player.username] > duel.playerScores[duel.winner]
        ) {
          duel.winner = player.username;
        }
      }, duel);
      await this.duelRepository.save(duel);
      return null;
    } else {
      duel.currentRound++;
      await this.duelRepository.save(duel);
      return duel.questions[duel.currentRound];
    }
  }

  async getWinner(duelId: string): Promise<string> {
    const duel = await this.getDuel(duelId);
    return duel.winner;
  }

  async checkLives(id: number) {
    throw new Error('Method not implemented.');
  }

  async addPlayerToDuel(duelId: string, playerId: number): Promise<Boolean> {
    const duel = await this.getDuelWithPlayers(duelId);
    const player = await this.userService.getUser(playerId);

    if (!player || !duel) {
      throw new WsException('User or duel not found');
    }

    if (duel.players) {
      duel.players.push(player);
    } else {
      duel.players = [player];
    }

    console.log('players', duel.players);
    await this.duelRepository.save(duel);
    return true;
  }
}
