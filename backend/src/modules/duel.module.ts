import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Duel } from '../entities/duel.entity';
import { DuelController } from '../controllers/duel.controller';
import { DuelService } from '../services/duel.service';
import { DuelGateway } from '../controllers/duel.gateway';
import { QuestionModule } from './question.module';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Duel]), QuestionModule, UserModule],
  controllers: [DuelController],
  providers: [DuelService, DuelGateway],
})
export class DuelModule {}
