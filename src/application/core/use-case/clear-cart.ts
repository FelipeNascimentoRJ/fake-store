import Symbols from '../../symbols';
import Container from '../../container';
import {CartRepository} from '../../domain/repository/cart';
import {ClearCartUseCase} from '../../domain/use-case/clear-cart';

export class ClearCartUseCaseImplementation implements ClearCartUseCase {
  private readonly repository: CartRepository;

  constructor(repository?: CartRepository) {
    if (repository) {
      this.repository = repository;
      return;
    }

    if (!Container.has(Symbols.repositories.cart)) {
      throw new Error('CartRepository not registered');
    }

    this.repository = Container.resolve<CartRepository>(
      Symbols.repositories.cart,
    ) as CartRepository;
  }

  async execute(): Promise<void> {
    await this.repository.clear();
  }
}
