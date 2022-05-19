import {CartEntity} from '../entity/cart';
import {ProductEntity} from '../entity/product';

export interface CartRepository {
  setCart: (cart: CartEntity) => Promise<void>;
  getCart: () => Promise<CartEntity>;
  insertProduct: (product: ProductEntity) => Promise<void>;
  updateProduct: (productId: number, quantity: number) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  clear(): Promise<void>;
}
