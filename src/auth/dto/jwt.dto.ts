import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class JwtDto {
    @ApiProperty()
    access_token: string;
}