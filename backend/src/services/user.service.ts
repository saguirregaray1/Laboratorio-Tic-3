import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { Cron } from '@nestjs/schedule';
import { GetCurrentQuestionDto } from '../dtos/GetCurrentQuestionDto';
import { Progress } from '../entities/progress.entity';
import { WorldService } from './world.service';
import { World } from '../entities/world.entity';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from './question.service';
import { CheckAnswerDto } from 'src/dtos/CheckAnswerDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly worldService: WorldService,
    private readonly questionService: QuestionService,
  ) {}

  async getUser(id: number): Promise<User> {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.book', 'books')
      .where('user.id = :id', { id })
      .getOne();
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  }

  async getUserFromToken(token: any): Promise<User> {
    const decoded = await this.jwtService.verify(token, {
      secret: this.configService.get('SECRET'),
    });

    const user = await this.getUserByUsername(decoded.username);
    if (!user) {
      throw new WsException('User not found');
    }
    return user;
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ token: string; userId: number }> {
    const foundUser = await this.userRepository.findOneBy({
      username: loginUserDto.username,
    });
    if (foundUser) {
      const password = foundUser.password;
      const isCorrect = await bcrypt.compare(loginUserDto.password, password);
      if (isCorrect) {
        const payload = { sub: foundUser.id, username: loginUserDto.username };
        const jwtToken = await this.jwtService.signAsync(payload, {
          secret: this.configService.get('SECRET'),
        });

        return {
          token: jwtToken,
          userId: foundUser.id,
        };
      }
    }
    throw new HttpException(
      'User or password is incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException(
        'Email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.userRepository.create({
      username: createUserDto.username,
      password: hash,
      email: createUserDto.email,
      course: createUserDto.course,
    });

    return this.userRepository.save(newUser);
  }

  @Cron('0 0 * * *')
  async updateLives() {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ lives: () => 'lives + 1' })
      .where('lives < :lives', { lives: 3 })
      .execute();
  }

  async getCurrentQuestion(getCurrentQuestion: GetCurrentQuestionDto) {
    const userProgress = await this.progressRepository
      .createQueryBuilder('progress')
      .leftJoinAndSelect('progress.currentQuestion', 'questions')
      .where('progress.user.id = :userId', {
        userId: getCurrentQuestion.userId,
      })
      .andWhere('progress.world.id = :worldId', {
        worldId: getCurrentQuestion.worldId,
      })
      .getOne();

    if (!userProgress) {
      const user = await this.getUser(getCurrentQuestion.userId);
      const world = await this.worldService.getWorldWithQuestions(
        getCurrentQuestion.worldId,
      );

      if (!user || !world) {
        throw new HttpException(
          'user or world not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const newProgress = await this.progressRepository.create({
        user: user,
        currentQuestion: world.questions[0],
        world: world,
        currentLevel: 0,
      });

      await this.progressRepository.save(newProgress).catch((err) => {
        console.log(err);
      });

      return 0;
    }
    if (!userProgress.currentQuestion) {
      return userProgress.currentLevel + 1;
    }
    return userProgress.currentLevel;
  }

  async updateProgress(userId: number, questionId: number) {
    const userProgress = await this.progressRepository
      .createQueryBuilder('progress')
      .leftJoinAndSelect('progress.currentQuestion', 'questions')
      .where('progress.user.id = :userId', {
        userId: userId,
      })
      .andWhere('progress.currentQuestion.id = :questionId', {
        questionId: questionId,
      })
      .getOne();

    if (userProgress) {
      if (userProgress.currentQuestion.id === questionId) {
        const question = await this.questionService.getQuestion(questionId);
        const world = await this.worldService.getWorldWithQuestions(
          question.world.id,
        );
        const currentQuestionIndex = world.questions.findIndex(
          (question) => question.id === questionId,
        );
        const nextQuestionIndex = currentQuestionIndex + 1;
        const nextQuestion =
          nextQuestionIndex < world.questions.length
            ? world.questions[nextQuestionIndex]
            : null;

        userProgress.currentQuestion = nextQuestion;
        userProgress.currentLevel = userProgress.currentLevel + 1;

        if (question.theorem) {
          const user = await this.getUser(userId);
          user.book.push(question.theorem);
          await this.userRepository.save(user);
        }
        console.log('userProgress', userProgress);

        await this.progressRepository.save(userProgress).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  async checkAnswer(checkAnswer: CheckAnswerDto): Promise<any> {
    const user = await this.getUser(checkAnswer.userId);
    const question = await this.questionService.getQuestion(
      checkAnswer.questionId,
    );

    if (!question || !user) {
      throw new HttpException(
        'question or user not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const isCorrect = question.answer === checkAnswer.answer;

    if (isCorrect) {
      this.updateProgress(checkAnswer.userId, checkAnswer.questionId);
    }

    return {
      isCorrect: isCorrect,
      answer: question.answer,
    };
  }

  async updateCourse(request: { id: number; course: string }) {
    const user = await this.getUser(request.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.course = request.course;
    await this.userRepository.save(user);
  }
}
