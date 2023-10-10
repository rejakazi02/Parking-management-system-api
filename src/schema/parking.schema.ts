import * as mongoose from 'mongoose';

export const ParkingSchema = new mongoose.Schema(
    {
        readOnly: {
            type: Boolean,
            required: false,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNo: {
            type: String,
            required: false,
        },
        carOwnerAddress: {
            type: String,
            required: false,
        },

        status: {
            type: String,
            required: false,
        },
        carEntry: {
            type: Date,
            required: false,
        },

        carExit: {
            type: Date,
            required: false,
        },
        parkingCharge: {
            type: Number,
            required: false,
        },
        vehicleType: {
            type: String,
            required: false,
        },

        licenseNo: {
            type: String,
            required: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);
