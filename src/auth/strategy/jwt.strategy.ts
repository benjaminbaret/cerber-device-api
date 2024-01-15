import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { Injectable} from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: {sub: number, signature: string}) {
        const device = await this.prisma.device.findUnique({
            where: {
                id: payload.sub, 
            },
        });
        delete device.hash;
        return device; 
    }

}