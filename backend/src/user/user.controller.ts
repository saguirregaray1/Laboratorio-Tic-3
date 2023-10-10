import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get('/all')
    get_all_users(){
        return {'user': 'Hernan', 'password': 'Puschiasis'}
    }

    @Post()
    createUser(@Req() request: Request, @Res() response: Response){
        console.log(request.body);
        response.ok;
    }

    @Get(':id')
    getUserById(@Param('id') id: Number){
        return {'id' : id}
    }

}
