import { Category } from './category.interface';
export interface SubCategory {
  _id?: string;
  readOnly?: boolean;
  category?: Category;
  name?: string;
  slug?: string;
  image?: string;
  priority?: number;
  status?: string;
}
