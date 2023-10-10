import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    mobileImage: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    priority: {
      type: Number,
      required: false,
    },
    shortDesc: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
