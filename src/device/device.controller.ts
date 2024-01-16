import { Controller, UseGuards, Patch, Body } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { EditDeviceDto } from '../device/dto/edit-device.dto';
import { JwtGuard } from '../auth/guard';
import { GetDevice } from '../auth/decorator';
import { ApiOkResponse, ApiForbiddenResponse, ApiBadRequestResponse, ApiBearerAuth} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) {
    }
    
    @ApiBearerAuth()
    @ApiOkResponse({ type: null, description: "Status successfully updated"})
    @ApiBadRequestResponse({ status: 401, description: "Bad Request or Unauthorized" })
    @Patch('status')
    editDeviceStatus(
        @GetDevice('id') deviceId: number,
        @Body() dto: EditDeviceDto,
    ) {
        return this.deviceService.editDeviceStatus(
            deviceId,
            dto,
        );
    }
}

