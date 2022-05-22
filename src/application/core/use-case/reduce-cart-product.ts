import Symbols from '../../symbols';
import Container from '../../container';
import {CartRepository} from '../../domain/repository/cart';
import {ReduceCartProductUseCase} from '../../domain/use-case/reduce-cart-product';

export class ReduceCartProductUseCaseImplementation
  implements ReduceCartProductUseCase
{
  private readonly repository: CartRepository;

  constructor() {
    if (!Container.has(Symbols.repositories.cart)) {
      throw new Error('CartRepository not registered');
    }

    this.repository = Container.resolve<CartRepository>(
      Symbols.repositories.cart,
    ) as CartRepository;
  }

  async execute(productId: number): Promise<void> {
    try {
      await this.repository.deleteProduct(productId);
    } catch (error) {
      return;
    }
  }
}
