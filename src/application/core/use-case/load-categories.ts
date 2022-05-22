import Symbols from '../../symbols';
import Container from '../../container';
import {CategoryRepository} from '../../domain/repository/category';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';
import {LoadCategoriesUseCase} from '../../domain/use-case/load-categories';

export class LoadCategoriesUseCaseImplementation
  implements LoadCategoriesUseCase
{
  private readonly repository: CategoryRepository;
  private readonly clientStorage: ClientStorageAdapter | undefined;
  private static readonly KEY_STORAGE = '@FakeStore/categories';

  constructor(
    repository?: CategoryRepository,
    clientStorage?: ClientStorageAdapter,
  ) {
    if (repository && clientStorage) {
      this.repository = repository;
      this.clientStorage = clientStorage;
      return;
    }

    if (!Container.has(Symbols.repositories.category)) {
      throw new Error('CategoryRepository not registered');
    }

    this.repository = Container.resolve<CategoryRepository>(
      Symbols.repositories.category,
    ) as CategoryRepository;

    if (Container.has(Symbols.adapters.clientStorage)) {
      this.clientStorage = Container.resolve<ClientStorageAdapter>(
        Symbols.adapters.clientStorage,
      ) as ClientStorageAdapter;
    }
  }

  public async execute(): Promise<string[]> {
    let categories = await this.loadCache();

    if (categories.length === 0) {
      categories = await this.repository.getAllCategories();

      if (categories.length >= 1) {
        // won't wait for return
        this.saveCache(categories);
      }
    }

    return categories;
  }

  private async loadCache(): Promise<string[]> {
    if (!this.clientStorage) {
      return [];
    }

    const categories = await this.clientStorage.select<string[]>(
      LoadCategoriesUseCaseImplementation.KEY_STORAGE,
    );

    if (categories && Array.isArray(categories)) {
      return categories;
    }

    return [];
  }

  private async saveCache(categories: string[]): Promise<void> {
    if (!this.clientStorage || categories.length === 0) {
      return;
    }

    await this.clientStorage.insert(
      LoadCategoriesUseCaseImplementation.KEY_STORAGE,
      categories,
    );
  }
}
