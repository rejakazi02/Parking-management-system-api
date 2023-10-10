import { Module } from '@nestjs/common';
import { PromoOfferController } from './promo-offer.controller';
import { PromoOfferService } from './promo-offer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoOfferSchema } from '../../../schema/promo-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PromoOffer', schema: PromoOfferSchema },
    ]),
  ],
  controllers: [PromoOfferController],
  providers: [PromoOfferService],
})
export class PromoOfferModule {}
