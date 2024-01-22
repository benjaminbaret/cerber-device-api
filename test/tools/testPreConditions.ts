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
            url: "https://147.135.129.16:9000/test-nico/bundle.raucb?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=3O9B1UQ1J4KWZQAU6FGQ%2F20240122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240122T102107Z&X-Amz-Expires=43200&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiIzTzlCMVVRMUo0S1daUUFVNkZHUSIsImV4cCI6MTcwNTk1NTc1MCwicGFyZW50Ijoicm9vdElzUm9vdCJ9.b4YoVJjrjaLjSM_rri7n7TpEE43tj-J7zByQnwHPmEjtisYcyR8DeZNwUTt9g4TkaGjSHzzejw_E8PVOBGccrA&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=934a6e3f05940ad16e41b1aa2583d9ef4e763efdbc7468a13b4a9ed7c23a0c38",
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
