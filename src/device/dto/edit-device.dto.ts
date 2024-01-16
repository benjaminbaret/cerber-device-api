import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class EditDeviceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;
}