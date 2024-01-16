import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

export class EditDeviceProgressDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    updateProgress: number;
}