import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditDeviceDto } from './dto/edit-device.dto';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) {}

    async editDeviceStatus(deviceId: number, dto: EditDeviceDto) {
        let device : Object = await this.prisma.device.findUnique({
            where: {
                id: deviceId,
            },
        });

        if (!device) {
            throw new ForbiddenException('Device not found');
        }

        this.prisma.device.update({
            where: {
                id: deviceId,
            },
            data: {
                status: dto.status,
            },
        });
    }
    
}
