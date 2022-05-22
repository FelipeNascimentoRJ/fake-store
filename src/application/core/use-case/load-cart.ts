import Symbols from '../../symbols';
import Container from '../../container';
import {CartEntity} from '../../domain/entity/cart';
import {CartRepository} from '../../domain/repository/cart';
import {LoadCartUseCase} from '../../domain/use-case/load-cart';

export class LoadCartUseCaseImplementation implements LoadCartUseCase {
  private readonly repository: CartRepository;

  constructor() {
    if (!Container.has(Symbols.repositories.cart)) {
      throw new Error('CartRepository not registered');
    }

    this.repository = Container.resolve<CartRepository>(
      Symbols.repositories.cart,
    ) as CartRepository;
  }

  async execute(): Promise<CartEntity | undefined> {
    try {
      return await this.repository.getCart();
    } catch (error) {
      return;
    }
  }
}
