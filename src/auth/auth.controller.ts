import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto, UserSchema } from 'src/users/users.dto';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)


  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDto: { phone: string, pass: string }) {
    return await this.authService.signIn(userDto)
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