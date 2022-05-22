import {ProductEntity} from '../entity/product';

export interface AddCartProductUseCase {
  execute(product: ProductEntity): Promise<void>;
}
