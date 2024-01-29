import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { sha256 } from 'js-sha256';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService) {}

    async signin(dto: AuthDto) {

        const device = await this.prisma.device.findUnique({
            where: {
                signature: dto.signature,
            },
        });

        if (!device) 
            throw new ForbiddenException(
            'Credentials Incorrect',
        );
        
        /* 
        // password correct ? yes : throw error
        const pwdMatches = await argon.verify(device.hash, dto.password); 
        */

        // workaround to match the use of sha256 in db with webapp
        const pwdMatches = device.hash === sha256(dto.password);

        if(!pwdMatches)
            throw new ForbiddenException(
                'Credentials Incorrect',
            );

        return this.signToken(device.id, device.signature);
    }

    async signToken(signature: number, email: string): Promise<{ access_token: string}> {
        const payload = {
            sub: signature, 
            email: email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            { 
            expiresIn: '30m', 
            secret: secret
            },
        );

        return {
            access_token: token,
        };
    }
}