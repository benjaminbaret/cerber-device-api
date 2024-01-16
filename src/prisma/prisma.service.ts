import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable( )
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                },
            },
        });
    }

    
    // tear down logic before e2e tests
    cleanDb() {

        /* return this.$transaction([
            
        ]); */
        this.user.deleteMany(),
            this.device.deleteMany()
    }
}