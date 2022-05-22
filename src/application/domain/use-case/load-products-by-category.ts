import {ProductEntity} from '../entity/product';

export interface LoadProductsByCategoryUseCase {
  execute(category: string): Promise<ProductEntity[]>;
}
