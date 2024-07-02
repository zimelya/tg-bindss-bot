import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto, CreateUserSchema } from 'src/users/users.dto';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)


  @Post('login')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async login(@Body() userDto: CreateUserDto) { 
      return await this.authService.login(userDto);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Body() userDto: CreateUserDto) { 
      return await this.authService.register(userDto);
  }

}