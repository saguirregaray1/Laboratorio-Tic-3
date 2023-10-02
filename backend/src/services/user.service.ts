import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import {CreateUserDto} from '../dtos/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
      
  //Chequear nombre de usuario que no sea duplicado
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({email:createUserDto.email})
    const newUser = this.userRepository.create(createUserDto);
    return existingUser ? null : this.userRepository.save(newUser);
  }

      
  // findUsersById(id: number): Promise<User> {
  //   return this.userRepository.findOne(id);
  // }
  
  
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async signup(user: User): Promise<User> {
  //   const salt = await bcrypt.genSalt();
  //   const hash = await bcrypt.hash(user.password, salt);
  //   const reqBody = {
  //     fullname: user.fullname,
  //     email: user.email,
  //     password: hash,
  //   };
  //   const newUser = new this.userModel(reqBody);
  //   return newUser.save();
  // }

  // async signin(user: User, jwt: JwtService): Promise<any> {
  //   const foundUser = await this.userModel
  //     .findOne({ email: user.email })
  //     .exec();
  //   if (foundUser) {
  //     const { password } = foundUser;
  //     if (bcrypt.compare(user.password, password)) {
  //       const payload = { email: user.email };
  //       return {
  //         token: jwt.sign(payload),
  //       };
  //     }
  //     return new HttpException(
  //       'Incorrect username or password',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   return new HttpException(
  //     'Incorrect username or password',
  //     HttpStatus.UNAUTHORIZED,
  //   );
  // }

  // async getOne(email) : Promise<User>{  
  //   return await this.userModel.findOne({ email }).exec();
  // }
}
