import {CartEntity} from '../entity/cart';

export interface LoadCartUseCase {
  execute(): Promise<CartEntity | undefined>;
}
