import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUpdateStatusDto, EditDeviceStatusDto, EditDeviceProgressDto, UpdateDto, EditDeviceDeploymentStatusDto } from './dto';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) {}

    async editDeviceStatus(deviceId: number, dto: EditDeviceStatusDto) {
        let device : Object = await this.prisma.device.findUnique({
            where: {
                id: deviceId,
            },
        });

        if (!device) {
            throw new ForbiddenException('Device not found');
        }

        await this.prisma.device.update({
            where: {
                id: deviceId,
            },
            data: {
                deviceStatus: dto.deviceStatus,
            },
        });
    }

    async editUpdateStatus(deviceId: number, dto: EditUpdateStatusDto) {
        let device : Object = await this.prisma.device.findUnique({
            where: {
                id: deviceId,
            },
        });

        if (!device) {
            throw new ForbiddenException('Device not found');
        }

        await this.prisma.device.update({
            where: {
                id: deviceId,
            },
            data: {
                updateStatus: dto.updateStatus,
            },
        });
    }


    async editDeviceUpdateProgress(deviceId: number, dto: EditDeviceProgressDto) {
        let device : Object = await this.prisma.device.findUnique({
            where: {
                id: deviceId,
            },
        });

        if (!device) {
            throw new ForbiddenException('Device not found');
        }
        
        await this.prisma.device.update({
            where: {
                id: deviceId,
            },
            data: {
                updateProgress: dto.updateProgress,
            },
        });
    }

    async editDeviceDeploymentStatus(deviceId: number, dto: EditDeviceDeploymentStatusDto) {


        await this.prisma.deployment.updateMany({
            where: {
                deviceId: deviceId,
                status: true, 
            },
            data: {
                status: dto.deploymentStatus,
            },
        });

        // true case is not handled, improvment have to be done on this route
    }


    
    async getNextUpdate(deviceId: number) {

        const device : Object = await this.prisma.device.findUnique({
            where: {
                id: deviceId,
            },
        });

        let groupId = device['groupId'];

        // todo: check if find first if correct --> 
        const deployment : Object = await this.prisma.deployment.findFirst({
            where: {
                OR: [
                    {
                        deviceId: deviceId,
                    },
                    {
                        groupId: groupId,
                    },
                ],
                AND: [
                    {
                        status: true,
                    },
                ],
            },
        });

        
        if(deployment)
        {
            let updateObject = await this.prisma.update.findUnique({
                where: {
                    id: deployment['updateId'],
                },
            });

            return {
                name: updateObject['name'],
                url: updateObject['url'],
                size: updateObject['size'],
            };
        }
        
        return null;
    }

}
