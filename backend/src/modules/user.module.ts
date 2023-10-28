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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '2h' },
    }),
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
