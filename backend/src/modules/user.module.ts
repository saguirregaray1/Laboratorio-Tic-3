import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/roles.guard';
import { AuthMiddleware } from '../app.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { Progress } from '../entities/progress.entity';
import { WorldService } from '../services/world.service';
import { World } from '../entities/world.entity';
import { QuestionModule } from './question.module';
import { Question } from 'src/entities/question.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Progress, World, Question]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '2h' },
    }),
    QuestionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    AuthMiddleware,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
