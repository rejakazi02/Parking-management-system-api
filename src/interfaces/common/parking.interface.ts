export interface Parking {
  select: boolean;
  _id?: string;
  name?: string;
  slug?: string;
  phoneNo?: string;
  carOwnerAddress?: string;
  status?: string;
  carEntry?: Date;
  carExit?: Date;
  parkingCharge?: number;
  vehicleType?: string;
  licenseNo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
