import {ProductEntity} from './product';

export type CartProductEntity = {
  product: ProductEntity;
  quantity: number;
};

export type CartEntity = {
  [productId: number]: CartProductEntity;
};
