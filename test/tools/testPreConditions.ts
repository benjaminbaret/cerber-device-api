import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../src/prisma/prisma.service';

const config = new ConfigService();
const prisma = new PrismaService(config);

export async function testPreConditions(): Promise<void> {
    const signature = "signature";
    const hash = await argon.hash('password');
    const name = "name";

    try {

    const user = await prisma.user.create({
        data: {
            email: "ben@gmail.com",
            hash,
        },
    });

    const userId = user.id;
    
    const device = await prisma.device.create({
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