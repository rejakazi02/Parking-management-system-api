import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSchema } from '../../../schema/parking.schema';
import { UserSchema } from '../../../schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Parking', schema: ParkingSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule {}  
