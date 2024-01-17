import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateDto {

    @Exclude()
    id: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uri: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    size: string;

    constructor(partial: Partial<UpdateDto>) {
        Object.assign(this, partial);
    }
    
}



