import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsBoolean,
} from 'class-validator';

export class EditDeviceDeploymentStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    deploymentStatus: boolean;
}