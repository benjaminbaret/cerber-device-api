import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class EditDeviceStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}