import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class EditUpdateStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    updateStatus: string;
}