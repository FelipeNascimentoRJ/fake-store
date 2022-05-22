import Symbols from '../../symbols';
import Container from '../../container';
import {CartRepository} from '../../domain/repository/cart';
import {ReduceCartProductUseCase} from '../../domain/use-case/reduce-cart-product';

export class ReduceCartProductUseCaseImplementation
  implements ReduceCartProductUseCase
{
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

  async execute(productId: number): Promise<void> {
    if (!productId) {
      throw new Error('productId is required');
    }

    await this.repository.deleteProduct(productId);
  }
}
