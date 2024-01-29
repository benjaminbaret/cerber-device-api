import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../src/prisma/prisma.service';

const config = new ConfigService();
const prisma = new PrismaService(config);

export async function testPreConditions(): Promise<void> {

    let signature = "signature";
    const hash = await argon.hash('password');
    const name = "name";

    try {

    await prisma.cleanDb();

    let user = await prisma.user.create({
        data: {
            email: "ben@gmail.com",
            hash,
        },
    });

    let userId = user.id;

    let device = await prisma.device.create({
        data: {
            signature,
            hash,
            name,
            userId,
        },
    });

    const update = await prisma.update.create({
        data: {
            name: "Raspberry udpate 1",
            url: "https://example.com",
            size: "100",
        },
    }); 


    const deployment = await prisma.deployment.create({
        data: {
            updateId: update.id,
            status: true,
            deviceId: device.id,       
        },
    });

    console.log(`Device with name ${name} added successfully.`);

    user = await prisma.user.create({
        data: {
            email: "another@gmail.com", 
            hash,
        }
    })

    userId = user.id;

    signature = "anotherSignature"

    device = await prisma.device.create({
        data: {
            signature,
            hash,
            name,
            userId,
        },
    });

    console.log(`Device with name ${name} added successfully.`);


    } catch (error) {
        console.error('Error adding device:', error);
    } finally {
        await prisma.$disconnect();
    }
}
