import { Review } from './review.model';

export interface Product {
  id: string;
  imgUrl: string;
  price: number;
  discount: number;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string;
  isNew: boolean;
  color: string[];
  size: string[];
  review: Review[];
  quantity?: number;
  selectedColor?: string;
  selectedSize?: string;
}