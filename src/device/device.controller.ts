import { Controller, UseGuards, Patch, Body } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { EditDeviceStatusDto, EditDeviceProgressDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetDevice } from '../auth/decorator';
import { ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) {
    }
    
    @ApiBearerAuth()
    @ApiOkResponse({ type: null, description: "Status successfully updated"})
    @ApiBadRequestResponse({ status: 400, description: "Bad Request or Unauthorized" })
    @ApiForbiddenResponse({ status: 403, description: "Forbidden" })
    @Patch('status')
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
    @ApiOkResponse({ type: null, description: "Update progress successfully updated"})
    @ApiBadRequestResponse({ status: 401, description: "Bad Request or Unauthorized" })
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

}

