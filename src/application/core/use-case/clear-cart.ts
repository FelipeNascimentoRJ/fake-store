import Symbols from '../../symbols';
import Container from '../../container';
import {CartRepository} from '../../domain/repository/cart';
import {ClearCartUseCase} from '../../domain/use-case/clear-cart';

export class ClearCartUseCaseImplementation implements ClearCartUseCase {
  private readonly repository: CartRepository;

  constructor() {
    if (!Container.has(Symbols.repositories.cart)) {
      throw new Error('CartRepository not registered');
    }

    this.repository = Container.resolve<CartRepository>(
      Symbols.repositories.cart,
    ) as CartRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.repository.clear();
    } catch (error) {
      return;
    }
  }
}
