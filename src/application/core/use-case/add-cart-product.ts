import Symbols from '../../symbols';
import Container from '../../container';
import {ProductEntity} from '../../domain/entity/product';
import {CartRepository} from '../../domain/repository/cart';
import {AddCartProductUseCase} from '../../domain/use-case/add-cart-product';

export class AddCartProductUseCaseImplementation
  implements AddCartProductUseCase
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

  async execute(product: ProductEntity): Promise<void> {
    if (!product) {
      throw new Error('Product is required');
    }

    await this.repository.insertProduct(product);
  }
}
