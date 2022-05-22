import Symbols from '../../symbols';
import Container from '../../container';
import {ProductEntity} from '../../domain/entity/product';
import {ProductRepository} from '../../domain/repository/product';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';
import {LoadProductsByCategoryUseCase} from '../../domain/use-case/load-products-by-category';

export class LoadProductsByCategoryUseCaseImplementation
  implements LoadProductsByCategoryUseCase
{
  private readonly repository: ProductRepository;
  private readonly clientStorage: ClientStorageAdapter | undefined;
  private static readonly KEY_STORAGE = '@FakeStore/product';

  constructor(
    repository?: ProductRepository,
    clientStorage?: ClientStorageAdapter,
  ) {
    if (repository && clientStorage) {
      this.repository = repository;
      this.clientStorage = clientStorage;
      return;
    }

    if (!Container.has(Symbols.repositories.product)) {
      throw new Error('ProductRepository not registered');
    }

    this.repository = Container.resolve<ProductRepository>(
      Symbols.repositories.product,
    ) as ProductRepository;

    if (Container.has(Symbols.adapters.clientStorage)) {
      this.clientStorage = Container.resolve<ClientStorageAdapter>(
        Symbols.adapters.clientStorage,
      ) as ClientStorageAdapter;
    }
  }

  public async execute(category: string): Promise<ProductEntity[]> {
    let products = await this.loadCache(category);

    if (products.length === 0) {
      products = await this.repository.getProductsByCategory(category);

      if (products.length >= 1) {
        // won't wait for return
        this.saveCache(category, products);
      }
    }

    return products;
  }

  private buildKey(category: string): string {
    return `${LoadProductsByCategoryUseCaseImplementation.KEY_STORAGE}/${category}`;
  }

  private async loadCache(category: string): Promise<ProductEntity[]> {
    if (!this.clientStorage) {
      return [];
    }

    const products = await this.clientStorage.select<ProductEntity[]>(
      this.buildKey(category),
    );

    if (products && Array.isArray(products)) {
      return products;
    }

    return [];
  }

  private async saveCache(
    category: string,
    products: ProductEntity[],
  ): Promise<void> {
    if (!this.clientStorage || products.length === 0) {
      return;
    }

    await this.clientStorage.insert(this.buildKey(category), products);
  }
}
