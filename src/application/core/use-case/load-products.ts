import Symbols from '../../symbols';
import Container from '../../container';
import {ProductEntity} from '../../domain/entity/product';
import {ProductRepository} from '../../domain/repository/product';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';
import {LoadProductsUseCase} from '../../domain/use-case/load-products';

export class LoadProductsUseCaseImplementation implements LoadProductsUseCase {
  private readonly repository: ProductRepository;
  private readonly clientStorage: ClientStorageAdapter | undefined;
  private static readonly KEY_STORAGE = '@FakeStore/products';

  constructor() {
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

  public async execute(): Promise<ProductEntity[]> {
    try {
      let products = await this.loadCache();

      if (products.length === 0) {
        products = await this.repository.getAllProducts();

        if (products.length >= 1) {
          // won't wait for return
          this.saveCache(products);
        }
      }

      return products;
    } catch (error) {
      return [];
    }
  }

  private async loadCache(): Promise<ProductEntity[]> {
    if (!this.clientStorage) {
      return [];
    }

    const products = await this.clientStorage.select<ProductEntity[]>(
      LoadProductsUseCaseImplementation.KEY_STORAGE,
    );

    if (products && Array.isArray(products)) {
      return products;
    }

    return [];
  }

  private async saveCache(products: ProductEntity[]): Promise<void> {
    if (!this.clientStorage || products.length === 0) {
      return;
    }

    await this.clientStorage.insert(
      LoadProductsUseCaseImplementation.KEY_STORAGE,
      products,
    );
  }
}
