import * as mongoose from 'mongoose';
import {ORDER_ITEM_SCHEMA} from './sub-schema.schema';
import {Schema} from 'mongoose';

export const OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        shippingAddress: { 
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            required: false,
        },
        paymentStatus: {
            type: String,
            required: true,
        },
        orderedItems: [ORDER_ITEM_SCHEMA],
        subTotal: {
            type: Number,
            required: true,
        },
        deliveryCharge: {
            type: Number,
            required: false,
        },
        discount: {
            type: Number,
            required: true,
        },
        productDiscount: {
            type: Number,
            required: false,
        },
        grandTotal: {
            type: Number,
            required: false,
        },
        discountTypes: {
            type: [Object],
            required: false,
        },
        checkoutDate: {
            type: String,
            required: false,
        },
        deliveryDate: {
            type: Date,
            required: false,
        },
        deliveryDateString: {
            type: String,
            required: false,
        },
        orderStatus: {
            type: Number,
            required: true,
        },
        hasOrderTimeline: {
            type: Boolean,
            required: false,
        },
        orderTimeline: {
            type: Object,
            required: false,
        },
        processingDate: {
            type: Date,
            required: false,
        },
        shippingDate: {
            type: Date,
            required: false,
        },
        deliveringDate: {
            type: Date,
            required: false,
        },
        preferredDateString: {
            type: String,
            required: false,
        },
        preferredTime: {
            type: String,
            required: false,
        },
        note: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        coupon: {
            type: Schema.Types.ObjectId,
            ref: 'Coupon',
            required: false,
        },
        couponDiscount: {
            type: Number,
            required: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);
