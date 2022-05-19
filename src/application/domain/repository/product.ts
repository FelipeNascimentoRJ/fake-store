import {ProductEntity} from '../entity/product';

export interface ProductRepository {
  getAllProducts: () => Promise<ProductEntity[]>;
  getProductsByCategory: (category: string) => Promise<ProductEntity[]>;
}
