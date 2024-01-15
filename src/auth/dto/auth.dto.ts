import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class AuthDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    signature: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

function AutoMap(): (target: AuthDto, propertyKey: "signature") => void {
    throw new Error('Function not implemented.');
}
