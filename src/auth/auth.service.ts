import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { error } from 'console';
import { jwtConstants } from './constants';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signIn({ phone, pass }: { phone: string, pass: string }): Promise<{ token: string }> {
    console.log("Sign In", phone, pass)
    const user = await this.usersService.findByPhone(phone)
    console.log("Sign In user", user)
    if (user && (await bcrypt.compare(pass, user.password))) {
      console.log("Sign In compare", "true")
      const { password, ...result } = user

      const payload = { data: result, sub: result.id }
      console.log("Sign In payload", payload)

      const token = await this.jwtService.signAsync(payload, { secret: jwtConstants.secret })
      console.log("Sign In token", token)
      return { token }
    } else {
      throw new UnauthorizedException()
    }
  }

  async register(userDto: CreateUserDto) {
    const exist = await this.usersService.findByPhone(userDto.phone)
    if (exist) {
      return { errorMessage: `User ${userDto.phone} exist` }
    }
    const user = await this.usersService.create(userDto)
    return { message: "Success" }
  }





  // verifyToken(token: string) {
  //   const decoded = this.jwtService.verify(token)
  //   console.log('verifyToken', decoded)
  //   return decoded
  // }
  // constructor(
  //   private readonly prisma: PrismaService,
  //   private readonly jwtService: JwtService,
  // ) { }

  // async validateUser(phone: string, pass: string): Promise<any> {
  //   const user = await this.prisma.user.findUnique({ where: { phone } });
  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async login(userDto: CreateUserDto) {
  //   const validate = await this.validateUser(userDto.phone, userDto.password)
  //   if (validate) {
  //     const payload = { data: validate, sub: validate.userId }
  //     const token = await this.jwtService.signAsync(payload)
  //     return { token }
  //   }
  //   return { error: { message: "invalid request" } }
  // }


  // async register(userDto: CreateUserDto) {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(userDto.password, salt);
  //   const exist = await this.prisma.user.findUnique({ where: { phone: userDto.phone } })
  //   if (exist) {
  //     return { errorMessage: `User ${userDto.phone} exist` }
  //   }
  //   const user = await this.prisma.user.create({
  //     data: {
  //       chatId: userDto.chatId,
  //       phone: userDto.phone,
  //       password: hashedPassword,
  //     },
  //   })
  //   return { message: "Success" }
  // }
}