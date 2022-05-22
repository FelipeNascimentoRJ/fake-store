import {ProductEntity} from '../entity/product';

export interface LoadProductsUseCase {
  execute(): Promise<ProductEntity[]>;
}
