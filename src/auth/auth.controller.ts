import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, JwtDto } from './dto';
import { ApiOkResponse, ApiForbiddenResponse, ApiBadRequestResponse} from '@nestjs/swagger';

@Controller('auth') 
export class AuthController {
    constructor(private authService: AuthService) {
    }
    
    
    @ApiOkResponse({ type: JwtDto, description: "Login successful", status: HttpStatus.OK, schema: { properties: { token: { type: 'string', example: 'a_value' } } } })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @ApiBadRequestResponse({ status: 400, description: "Bad Request" })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }
}