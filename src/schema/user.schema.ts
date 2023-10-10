import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    profileImg: {
      type: String,
    },
    registrationType: {
      type: String,
      required: false,
    },
    hasAccess: {
      type: Boolean,
      required: true,
    },
    carts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: false,
      },
    ],
    usedCoupons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    ],
    authors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
