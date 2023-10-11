import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './services/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = await this.jwt.verify(token, {
          secret: this.configService.get('SECRET'),
        });

        const user = await this.userService.getUserByUsername(decoded.username);

        if (user) {
          req.user = user;
          next();
        } else {
          throw new HttpException('Unauthorized1', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('No token found', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      // Catch and handle any exceptions thrown during verification or user retrieval
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
