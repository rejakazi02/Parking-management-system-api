import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class AddParkingDto {
  @IsNotEmpty()
  @IsString()
  name: string;



  @IsOptional()
  @IsString()
  bannerImage: string;

  @IsNotEmpty()
  startDateTime: any;

  @IsNotEmpty()
  endDateTime: any;
}

export class FilterParkingDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  visibility: boolean;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  price: number;
}

export class OptionParkingDto {
  @IsOptional()
  @IsBoolean()
  deleteMany: boolean;
}

export class UpdateParkingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  parkingCode: string;

  @IsOptional()
  @IsString()
  bannerImage: string;

  @IsNotEmpty()
  startDateTime: any;

  @IsNotEmpty()
  endDateTime: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  ids: string[];
}

export class FilterAndPaginationParkingDto {
  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FilterParkingDto)
  filter: FilterParkingDto;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  sort: object;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  select: any;
}

export class CheckParkingDto {
  @IsNotEmpty()
  @IsString()
  parkingCode: string;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;
}
