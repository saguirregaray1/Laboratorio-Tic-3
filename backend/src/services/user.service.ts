import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /*async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    const newUser = this.userRepository.create(createUserDto);
    return existingUser ? null : this.userRepository.save(newUser);
  } */

  async getUser(id: number): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new Error('User does not exist');
    }
    return existingUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });
    if (!foundUser) {
      throw new Error('User does not exist');
    }
    return foundUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
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
        };
      }
    }
    throw new Error('Username or password is incorrect');
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.userRepository.create({
      username: createUserDto.username,
      password: hash,
      email: createUserDto.email,
    });

    return this.userRepository.save(newUser);
  }
}
