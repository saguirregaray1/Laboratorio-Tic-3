import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { AuthMiddleware } from './app.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities/entities';
import { TriviaQuestionModule } from './modules/trivia_question.module';
import { QuestionModule } from './modules/question.module';
import { UserController } from './controllers/user.controller';
import { HistoryController } from './controllers/question.controller';
import { DuelModule } from './modules/duel.module';
import { DuelController } from './controllers/duel.controller';
import { TriviaQuestionController } from './controllers/trivia.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TriviaQuestionModule,
    QuestionModule,
    DuelModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        dropSchema: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController], //QuestionController, UserControlle
  providers: [AppService], //QuestionService, UserService
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/v1/user/signup', method: RequestMethod.POST },
        { path: 'api/v1/user/login', method: RequestMethod.POST },
        { path: 'api/v1/trivia/id/:id', method: RequestMethod.GET },
        { path: 'api/v1/trivia/play', method: RequestMethod.POST },
        { path: 'api/v1/trivia/play/check', method: RequestMethod.POST },
      )
      .forRoutes(
        UserController,
        HistoryController,
        DuelController,
        TriviaQuestionController,
      );
  }
}
