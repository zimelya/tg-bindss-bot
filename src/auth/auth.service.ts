import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/users.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phone: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: CreateUserDto){
    const validate = await this.validateUser(userDto.phone, userDto.password)
    if(validate){
      const payload = { data: validate, sub: validate.userId }
      const token = await this.jwtService.signAsync(payload)
      return {token}
    }
    return {error: {message: "invalid request"}}
  }


  async register(userDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const exist = await this.prisma.user.findUnique({ where: { phone: userDto.phone} })  
    if(exist) {
      return  { errorMessage: `User ${ userDto.phone} exist`}
    }
    const user = await this.prisma.user.create({
      data: {
        chatId: userDto.chatId,
        phone: userDto.phone,
        password: hashedPassword,
      },
    })
    return { message: "Success"}
  }
}