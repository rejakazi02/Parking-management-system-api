export interface Product {
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  featureTitle?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  sku: string;
  emiMonth?: number[];
  threeMonth?: number;
  emiAmount?: number;
  sixMonth?: number;
  twelveMonth?: number;
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  cartLimit?: number;
  totalPages?:number | any;
  currentVersion?: number | any;
  publishedDate?:Date;
  translatorName?:string;
  category?: CatalogInfo;
  subCategory?: CatalogInfo;
  brand?: CatalogInfo;
  publisher?: CatalogInfo;
  author?: CatalogInfo;
  tags?: string[];
  status?: string;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  // Discount Date Time
  discountStartDateTime?: Date;
  discountEndDateTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}

interface CatalogInfo {
  _id: string;
  name: string;
  slug: string;
}
