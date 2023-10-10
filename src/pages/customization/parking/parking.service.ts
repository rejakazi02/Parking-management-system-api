import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../../../shared/utils/utils.service';
import { Parking } from '../../../interfaces/common/parking.interface';
import { ResponsePayload } from '../../../interfaces/core/response-payload.interface';
import { ErrorCodes } from '../../../enum/error-code.enum';
import {
  AddParkingDto,
  CheckParkingDto,
  FilterAndPaginationParkingDto,
  OptionParkingDto,
  UpdateParkingDto,
} from '../../../dto/parking.dto';
import { User } from '../../../interfaces/user/user.interface';

const ObjectId = Types.ObjectId;

@Injectable()
export class ParkingService {
  private logger = new Logger(ParkingService.name);

  constructor(
    @InjectModel('Parking') private readonly parkingModel: Model<Parking>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private configService: ConfigService,
    private utilsService: UtilsService,
  ) {}

  /**
   * addParking
   * insertManyParking
   */
  async addParking(addParkingDto: AddParkingDto): Promise<ResponsePayload> {
    const { name } = addParkingDto;

    const defaultData = {
      slug: this.utilsService.transformToSlug(name),
    };
    const mData = { ...addParkingDto, ...defaultData };
    const newData = new this.parkingModel(mData);
    try {
      const saveData = await newData.save();
      const data = {
        _id: saveData._id,
      };
      return {
        success: true,
        message: 'Data Added Successfully',
        data,
      } as ResponsePayload;
    } catch (error) {
      console.log(error);
      if (error.code && error.code.toString() === ErrorCodes.UNIQUE_FIELD) {
        throw new ConflictException('Slug Must be Unique');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async insertManyParking(
    addParkingsDto: AddParkingDto[],
    optionParkingDto: OptionParkingDto,
  ): Promise<ResponsePayload> {
    const { deleteMany } = optionParkingDto;
    if (deleteMany) {
      await this.parkingModel.deleteMany({});
    }
    const mData = addParkingsDto.map((m) => {
      return {
        ...m,
        ...{
          slug: this.utilsService.transformToSlug(m.name),
        },
      };
    });
    try {
      const saveData = await this.parkingModel.insertMany(mData);
      return {
        success: true,
        message: `${
          saveData && saveData.length ? saveData.length : 0
        }  Data Added Success`,
      } as ResponsePayload;
    } catch (error) {
      // console.log(error);
      if (error.code && error.code.toString() === ErrorCodes.UNIQUE_FIELD) {
        throw new ConflictException('Slug Must be Unique');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * getAllParkings
   * getParkingById
   */
  async getAllParkingsBasic() {
    try {
      const pageSize = 10;
      const currentPage = 1;
      
      const data = await this.parkingModel
        .find()
        .skip(pageSize * (currentPage - 1))
        .limit(Number(pageSize));
      return {
        success: true,
        message: 'Success',
      
        
        data,
     
        
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllParkings(
    filterParkingDto: FilterAndPaginationParkingDto,
    searchQuery?: string,
  ): Promise<ResponsePayload> {
    const { filter } = filterParkingDto;
    const { pagination } = filterParkingDto;
    const { sort } = filterParkingDto;
    const { select } = filterParkingDto;

    // Essential Variables
    const aggregateSparkinges = [];
    let mFilter = {};
    let mSort = {};
    let mSelect = {};
    let mPagination = {};

    // Match
    if (filter) {
      mFilter = { ...mFilter, ...filter };
    }
    if (searchQuery) {
      mFilter = { ...mFilter, ...{ name: new RegExp(searchQuery, 'i') } };
    }
    // Sort
    if (sort) {
      mSort = sort;
    } else {
      mSort = { createdAt: -1 };
    }

    // Select
    if (select) {
      mSelect = { ...select };
    } else {
      mSelect = { 
        name: 1,
       };
    }   

    // Finalize
    if (Object.keys(mFilter).length) {
      aggregateSparkinges.push({ $match: mFilter });
    }

    if (Object.keys(mSort).length) {
      aggregateSparkinges.push({ $sort: mSort });
    }

    if (!pagination) {
      aggregateSparkinges.push({ $project: mSelect });
    }

    // Pagination
    if (pagination) {
      if (Object.keys(mSelect).length) {
        mPagination = {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [
              {
                $skip: pagination.pageSize * pagination.currentPage,
              } /* IF PAGE START FROM 0 OR (pagination.currentPage - 1) IF PAGE 1*/,
              { $limit: pagination.pageSize },
              { $project: mSelect },
            ],
          },
        };
      } else {
        mPagination = {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [
              {
                $skip: pagination.pageSize * pagination.currentPage,
              } /* IF PAGE START FROM 0 OR (pagination.currentPage - 1) IF PAGE 1*/,
              { $limit: pagination.pageSize },
            ],
          },
        };
      }

      aggregateSparkinges.push(mPagination);

      aggregateSparkinges.push({
        $project: {
          data: 1,
          count: { $arrayElemAt: ['$metadata.total', 0] },
        },
      });
    }

    try {
      const dataAggregates = await this.parkingModel.aggregate(
        aggregateSparkinges,
      );
      if (pagination) {
        return {
          ...{ ...dataAggregates[0] },
          ...{ success: true, message: 'Success' },
        } as ResponsePayload;
      } else {
        return {
          data: dataAggregates,
          success: true,
          message: 'Success',
          count: dataAggregates.length,
        } as ResponsePayload;
      }
    } catch (err) {
      this.logger.error(err);
      if (err.code && err.code.toString() === ErrorCodes.PROJECTION_MISMATCH) {
        throw new BadRequestException('Error! Projection mismatch');
      } else {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async getParkingById(id: string, select: string): Promise<ResponsePayload> {
    try {
      const data = await this.parkingModel.findById(id).select(select);
      return {
        success: true,
        message: 'Single parking get Successfully',
        data,
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  /**
   * updateParkingById
   * updateMultipleParkingById
   */
  async updateParkingById(
    id: string,
    updateParkingDto: UpdateParkingDto,
  ): Promise<ResponsePayload> {
    const { name } = updateParkingDto;
    let data;
    try {
      data = await this.parkingModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
    if (!data) {
      throw new NotFoundException('No Data found!');
    }
    try {
      const finalData = { ...updateParkingDto };

      await this.parkingModel.findByIdAndUpdate(id, {
        $set: finalData,
      });
      return {
        success: true,
        message: 'Update Successfully',
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateMultipleParkingById(
    ids: string[],
    updateParkingDto: UpdateParkingDto,
  ): Promise<ResponsePayload> {
    const mIds = ids.map((m) => new ObjectId(m));

    try {
      await this.parkingModel.updateMany(
        { _id: { $in: mIds } },
        { $set: updateParkingDto },
      );

      return {
        success: true,
        message: 'Success',
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  /**
   * deleteParkingById
   * deleteMultipleParkingById
   */
  async deleteParkingById(
    id: string,
    checkUsage: boolean,
  ): Promise<ResponsePayload> {
    let data;
    try {
      data = await this.parkingModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
    if (!data) {
      throw new NotFoundException('No Data found!');
    }
    try {
      await this.parkingModel.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Delete Successfully',
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteMultipleParkingById(
    ids: string[],
    checkUsage: boolean,
  ): Promise<ResponsePayload> {
    try {
      const mIds = ids.map((m) => new ObjectId(m));
      await this.parkingModel.deleteMany({ _id: ids });
      return {
        success: true,
        message: 'Success',
      } as ResponsePayload;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  /**
   * COUPON FUNCTIONS
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */
  async checkParkingAvailability(
    user: User,
    checkParkingDto: CheckParkingDto,
  ): Promise<ResponsePayload> {
    try {
      const { parkingCode, subTotal } = checkParkingDto;

      const parkingData = await this.parkingModel.findOne({ parkingCode });

      if (parkingData) {
        const isExpired = this.utilsService.getDateDifference(
          new Date(),
          // new Date(parkingData.endDateTime),
          'seconds',
        );

        const isStartDate = this.utilsService.getDateDifference(
          new Date(),
          // new Date(parkingData.startDateTime),
          'seconds',
        );

        if (isStartDate > 0) {
          return {
            success: false,
            message: 'Sorry! Parking offer is not start yet',
            data: null,
          } as ResponsePayload;
        }

        if (isExpired <= 0) {
          return {
            success: false,
            message: 'Sorry! Parking Expired',
            data: null,
          } as ResponsePayload;
        } else {
          const userParkingExists = await this.userModel.findOne({
            _id: user._id,
            usedParkings: parkingData._id,
          });

          if (userParkingExists) {
            return {
              success: false,
              message: 'Sorry! Parking already used in your account.',
              data: null,
            } as ResponsePayload;
          } else {
            if (parkingData['minimumAmount'] > subTotal) {
              return {
                success: false,
                message: `Sorry! Parking minimum amount is ${parkingData['minimumAmount']}`,
                data: null,
              } as ResponsePayload;
            } else {
              return {
                success: true,
                message: 'Success! Parking added.',
                data: {
                  _id: parkingData._id,
                  discountAmount: parkingData['discountAmount'],
                  discountType: parkingData['discountType'],
                  parkingCode: parkingData['parkingCode'],
                },
              } as ResponsePayload;
            }
          }
        }
      } else {
        return {
          success: false,
          message: 'Sorry! Invalid parking code',
          data: null,
        } as ResponsePayload;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
