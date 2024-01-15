import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService) {}

    async signin(dto: AuthDto) {
        
        // Device exist ?  if not : throw error
        const user = await this.prisma.device.findUnique({
            where: {
                signature: dto.signature,
            },
        });

        if (!user) 
            throw new ForbiddenException(
            'Credentials Incorrect',
        );

        // password correct ? yes : throw error
        const pwdMatches = await argon.verify(user.hash, dto.password);

        if(!pwdMatches)
            throw new ForbiddenException(
                'Credentials Incorrect',
            );

        return this.signToken(user.id, user.signature);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string}> {
        const payload = {
            sub: userId, 
            email: email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            { 
            expiresIn: '15m', 
            secret: secret
            },
        );

        return {
            access_token: token,
        };
    }
}