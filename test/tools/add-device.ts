import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../src/prisma/prisma.service';

const config = new ConfigService();
const prisma = new PrismaService(config);

async function addDevice(signature: string, hash: string, name: string): Promise<void> {
try {

    const user = await prisma.user.create({
        data: {
            email: "    ",
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



async function main() {
    const hashPassword = await argon.hash('password');

    addDevice('signature', hashPassword, "name");
}

main();
