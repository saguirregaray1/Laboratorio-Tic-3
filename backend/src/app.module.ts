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
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { Question, QuestionSchema } from './schemas/question.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { QuestionModule } from './modules/question.module';
import { UserModule } from './modules/user.module';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/triviadb'),
    QuestionModule,
    UserModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController, QuestionController, UserController],
  providers: [AppService, QuestionService, UserService],
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
