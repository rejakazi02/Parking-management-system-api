import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const COURSE_MODULE_SCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: false,
  },
);


export const PACKAGE_ITEMS = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    hasVariations: {
      type: Boolean,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    selectedVariation: {
      type: Schema.Types.ObjectId,
      ref: 'Product.variationsOptions',
      required: false,
    },
  },
  {
    _id: true,
    versionKey: false,
  },
);

export const ORDER_ITEM_SCHEMA = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      slug: {
        type: String,
        required: false,
      },
    },
    category: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    subCategory: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    publisher: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    brand: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Parking',
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
    regularPrice: {
      type: Number,
      required: false,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
    },
    discountAmount: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
  },
  {
    _id: true,
  },
);

export const VARIATION_SUB_SCHEMA = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Variation',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    values: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const PRODUCT_VARIATION_OPTION_SCHEMA = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Variation',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const PRODUCT_DISCOUNT_OPTIONS = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
    },
    offerDiscountAmount: {
      type: Number,
      required: false,
    },
    offerDiscountType: {
      type: Number,
      required: false,
    },
    resetDiscount: {
      type: Boolean,
      required: false,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);
