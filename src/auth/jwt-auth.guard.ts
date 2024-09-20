import { Injectable, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    @Get()
    @UseGuards(JwtAuthGuard)
    getProtectedResource() {
        return { message: 'This is protected ressource' }
    }

}