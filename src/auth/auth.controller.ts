import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserSchema } from 'src/users/users.dto';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)


  // @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() userDto: { phone: string, pass: string }) {
    return await this.authService.signIn(userDto)
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    console.log(userDto)
    return await this.authService.register(userDto)
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // async profile(@Request() req) {
  //   return req.user
  // }

  // @Post('register')
  // @UsePipes(new ZodValidationPipe(UserSchema))
  // async register(@Body() userDto: CreateUserDto) {
  //   return await this.authService.register(userDto);
  // }

}