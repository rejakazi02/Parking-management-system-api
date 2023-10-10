import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AdminMetaRoles } from '../../../decorator/admin-roles.decorator';
import { AdminRoles } from '../../../enum/admin-roles.enum';
import { AdminRolesGuard } from '../../../guards/admin-roles.guard';
import { AdminMetaPermissions } from '../../../decorator/admin-permissions.decorator';
import { AdminPermissions } from '../../../enum/admin-permission.enum';
import { AdminPermissionGuard } from '../../../guards/admin-permission.guard';
import { AdminJwtAuthGuard } from '../../../guards/admin-jwt-auth.guard';
import {
  AddParkingDto,
  CheckParkingDto,
  FilterAndPaginationParkingDto,
  OptionParkingDto,
  UpdateParkingDto,
} from '../../../dto/parking.dto';
import { ResponsePayload } from '../../../interfaces/core/response-payload.interface';
import { MongoIdValidationPipe } from '../../../pipes/mongo-id-validation.pipe';
import { ParkingService } from './parking.service';
import { UserJwtAuthGuard } from '../../../guards/user-jwt-auth.guard';
import { GetTokenUser } from '../../../decorator/get-token-user.decorator';
import { User } from '../../../interfaces/user/user.interface';

@Controller('parking')
export class ParkingController {
  private logger = new Logger(ParkingController.name);

  constructor(private parkingService: ParkingService) {}

  /**
   * addParking
   * insertManyParking
   */
  @Post('/add')
  // @UsePipes(ValidationPipe)
  // @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  // @UseGuards(AdminRolesGuard)
  // @AdminMetaPermissions(AdminPermissions.CREATE)
  // @UseGuards(AdminPermissionGuard)
  // @UseGuards(AdminJwtAuthGuard)
  async addParking(
    @Body()
    addParkingDto: AddParkingDto,
  ): Promise<ResponsePayload> {
    return await this.parkingService.addParking(addParkingDto);
  }

  @Post('/insert-many')
  @UsePipes(ValidationPipe)
  @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  @UseGuards(AdminRolesGuard)
  @AdminMetaPermissions(AdminPermissions.CREATE)
  @UseGuards(AdminPermissionGuard)
  @UseGuards(AdminJwtAuthGuard)
  async insertManyParking(
    @Body()
    body: {
      data: AddParkingDto[];
      option: OptionParkingDto;
    },
  ): Promise<ResponsePayload> {
    return await this.parkingService.insertManyParking(body.data, body.option);
  }

  /**
   * getAllParkings
   * getParkingById
   */
  @Version(VERSION_NEUTRAL)
  @Post('/get-all')
  @UsePipes(ValidationPipe)
  async getAllParkings(
    @Body() filterParkingDto: FilterAndPaginationParkingDto,
    @Query('q') searchString: string,
  ): Promise<ResponsePayload> {
    return this.parkingService.getAllParkings(filterParkingDto, searchString);
  }

  @Version(VERSION_NEUTRAL)
  @Get('/get-all-basic')
  async getAllParkingsBasic(): Promise<ResponsePayload> {
    return await this.parkingService.getAllParkingsBasic();
  }

  @Version(VERSION_NEUTRAL)
  @Get('/:id')
  async getParkingById(
    @Param('id', MongoIdValidationPipe) id: string,
    @Query() select: string,
  ): Promise<ResponsePayload> {
    return await this.parkingService.getParkingById(id, select);
  }

  /**
   * updateParkingById
   * updateMultipleParkingById
   */
  @Version(VERSION_NEUTRAL)
  @Put('/update/:id')
  // @UsePipes(ValidationPipe)
  // @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  // @UseGuards(AdminRolesGuard)
  // @AdminMetaPermissions(AdminPermissions.EDIT)
  // @UseGuards(AdminPermissionGuard)
  // @UseGuards(AdminJwtAuthGuard)
  async updateParkingById(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() updateParkingDto: UpdateParkingDto,
  ): Promise<ResponsePayload> {
    return await this.parkingService.updateParkingById(id, updateParkingDto);
  }

  @Version(VERSION_NEUTRAL)
  @Put('/update-multiple')
  @UsePipes(ValidationPipe)
  @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  @UseGuards(AdminRolesGuard)
  @AdminMetaPermissions(AdminPermissions.EDIT)
  @UseGuards(AdminPermissionGuard)
  @UseGuards(AdminJwtAuthGuard)
  async updateMultipleParkingById(
    @Body() updateParkingDto: UpdateParkingDto,
  ): Promise<ResponsePayload> {
    return await this.parkingService.updateMultipleParkingById(
      updateParkingDto.ids,
      updateParkingDto,
    );
  }

  /**
   * deleteParkingById
   * deleteMultipleParkingById
   */
  @Version(VERSION_NEUTRAL)
  @Delete('/delete/:id')
  // @UsePipes(ValidationPipe)
  // @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  // @UseGuards(AdminRolesGuard)
  // @AdminMetaPermissions(AdminPermissions.DELETE)
  // @UseGuards(AdminPermissionGuard)
  // @UseGuards(AdminJwtAuthGuard)
  async deleteParkingById(
    @Param('id', MongoIdValidationPipe) id: string,
    @Query('checkUsage') checkUsage: boolean,
  ): Promise<ResponsePayload> {
    return await this.parkingService.deleteParkingById(id, Boolean(checkUsage));
  }

  @Version(VERSION_NEUTRAL)
  @Post('/delete-multiple')
  @UsePipes(ValidationPipe)
  @AdminMetaRoles(AdminRoles.SUPER_ADMIN)
  @UseGuards(AdminRolesGuard)
  @AdminMetaPermissions(AdminPermissions.DELETE)
  @UseGuards(AdminPermissionGuard)
  @UseGuards(AdminJwtAuthGuard)
  async deleteMultipleParkingById(
    @Body() data: { ids: string[] },
    @Query('checkUsage') checkUsage: boolean,
  ): Promise<ResponsePayload> {
    return await this.parkingService.deleteMultipleParkingById(
      data.ids,
      Boolean(checkUsage),
    );
  }

  @Post('/check-parking-availability')
  @UsePipes(ValidationPipe)
  @UseGuards(UserJwtAuthGuard)
  async checkParkingAvailability(
    @GetTokenUser() user: User,
    @Body() checkParkingDto: CheckParkingDto,
  ): Promise<ResponsePayload> {
    return await this.parkingService.checkParkingAvailability(
      user,
      checkParkingDto,
    );
  }
}
