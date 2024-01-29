import { Controller, UseGuards, Patch, Body, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { EditUpdateStatusDto, EditDeviceStatusDto, EditDeviceProgressDto, UpdateDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetDevice } from '../auth/decorator';
import { ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNoContentResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) {
    }
    
    @ApiBearerAuth()
    @ApiOkResponse({ type: null, description: "Status successfully updated"})
    @ApiUnauthorizedResponse({ description: "Bad Request or Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Patch('deviceStatus')
    editDeviceStatus(
        @GetDevice('id') deviceId: number,
        @Body() dto: EditDeviceStatusDto,
    ) {
        return this.deviceService.editDeviceStatus(
            deviceId,
            dto,
        );
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: null, description: "Status successfully updated"})
    @ApiUnauthorizedResponse({ description: "Bad Request or Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Patch('updateStatus')
    editUpdateStatus(
        @GetDevice('id') deviceId: number,
        @Body() dto: EditUpdateStatusDto,
    ) {
        return this.deviceService.editUpdateStatus(
            deviceId,
            dto,
        );
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: null, description: "Update progress successfully updated"})
    @ApiUnauthorizedResponse({ description: "Bad Request or Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Patch('progress')
    editDeviceUpdateProgress(
        @GetDevice('id') deviceId: number, 
        @Body() dto: EditDeviceProgressDto,
    ){
        return this.deviceService.editDeviceUpdateProgress(
            deviceId,
            dto,
        );
    }

    @ApiBearerAuth()    
    @ApiOkResponse({type: UpdateDto, description : "Update available at indicated path"})
    @ApiNoContentResponse({status: 204, description: "No update available"})
    @ApiUnauthorizedResponse({ description: "Bad Request or Unauthorized" })
    @Get('update/next')
    @UseInterceptors(ClassSerializerInterceptor)
    getNextUpdate(
        @GetDevice('id') deviceId: number,
    ) {

        return this.deviceService.getNextUpdate(
            deviceId,
        );
    }
}

