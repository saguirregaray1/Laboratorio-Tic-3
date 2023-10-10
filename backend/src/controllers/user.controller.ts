import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginUserDto } from '../dtos/LoginUserDto';
@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/:id')
  async getUsers(@Res() response, @Param('id') id) {
    try {
      const user = await this.userService.getUser(id);
      return response.status(HttpStatus.OK).json(user);
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.signUp(createUserDto);
      return response.status(HttpStatus.CREATED).json(newUser);
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.userService.login(loginUserDto);
      return response.status(HttpStatus.OK).json(token);
    } catch (HttpException) {
      return response
        .status(HttpException.status)
        .json({ message: HttpException.message });
    }
  }
}
