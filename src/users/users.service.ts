import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './users.dto';
import { PermissionDto } from './permissions.dto';


@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        phone,
      },
    })
  }

  async create(data: CreateUserDto): Promise<User> {

    const newUser: CreateUserDto = data
    const roleId = await this.prisma.userRole.findUnique({
      where: { name: "GUEST" }
    })

    newUser['roleId'] = roleId.id

    console.log('create user ', newUser)

    return this.prisma.user.create({
      data: newUser
    })
  }

  async update(
    id: number,
    data: { name?: string; phone?: string; email?: string; chatId: string },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async getUserPermisions(): Promise<PermissionDto[]> {
    return this.prisma.permission.findMany()
  }
}
