import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { Question, QuestionSchema } from './schemas/trivia_question.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './modules/user.module';
//import { isAuthenticated } from './app.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './entities/entities';
import { TriviaQuestionModule } from './modules/trivia_question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TriviaQuestionModule,
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
      }),
      inject: [ConfigService],
    }),
    //Para que es esto?
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './public',
    //     filename: (req, file, cb) => {
    //       const ext = file.mimetype.split('/')[1];
    //       cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    //     },
    //   }),
    // }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController], //QuestionController, UserControlle
  providers: [AppService], //QuestionService, UserService
})
export class AppModule {
  /*
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'api/v1/user/signup', method: RequestMethod.POST },
        { path: 'api/v1/user/signin', method: RequestMethod.POST },
        { path: 'api/v1/question/play/trivia', method: RequestMethod.POST },
        { path: 'api/v1/question/play/trivia', method: RequestMethod.GET },
      )
      .forRoutes(UserController, QuestionController);
  }
  */
}
