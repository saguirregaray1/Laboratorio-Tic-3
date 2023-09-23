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
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/CreateUserDto';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  
  // @Get()
  // getUsers() {
  //   return this.userService.getUsers();
  // }
  
  // @Get('id/:id')
  // findUsersById(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.findUsersById(id);
  // }
  
  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto); 
    if(!!newUser){
      return response.status(HttpStatus.CREATED).json();  
    }
    return response.status(HttpStatus.CONFLICT).json();
  }
  // @Post('/signup')
  // async Signup(@Res() response, @Body() user: User) {
  //   const newUSer = await this.userService.signup(user);
  //   return response.status(HttpStatus.CREATED).json({
  //     newUSer,
  //   });
  // }
  // @Post('/signin')
  // async SignIn(@Res() response, @Body() user: User) {
  //   const token = await this.userService.signin(user, this.jwtService);
  //   return response.status(HttpStatus.OK).json(token);
  // }
}
