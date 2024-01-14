import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    signature: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}