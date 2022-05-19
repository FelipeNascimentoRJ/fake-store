import {CartEntity} from '../entity/cart';
import {ProductEntity} from '../entity/product';

export interface CartRepository {
  setCart: (cart: CartEntity) => void;
  getCart: () => Promise<CartEntity>;
  insertProduct: (product: ProductEntity) => void;
  updateProduct: (productId: number, quantity: number) => void;
  deleteProduct: (productId: number) => void;
  clear(): void;
}
