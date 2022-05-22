import Symbols from '../../symbols';
import Container from '../../container';
import {CartEntity} from '../../domain/entity/cart';
import {ProductEntity} from '../../domain/entity/product';
import {CartRepository} from '../../domain/repository/cart';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';

export class CartRepositoryImplementation implements CartRepository {
  private readonly clientStorage: ClientStorageAdapter;
  private static readonly KEY_STORAGE = '@FakeStore/cart';

  constructor(clientStorage?: ClientStorageAdapter) {
    if (clientStorage) {
      this.clientStorage = clientStorage;
      return;
    }

    if (!Container.has(Symbols.adapters.clientStorage)) {
      throw new Error('ClientStorageAdapter not registered');
    }

    this.clientStorage = Container.resolve<ClientStorageAdapter>(
      Symbols.adapters.clientStorage,
    ) as ClientStorageAdapter;
  }

  public async setCart(cart: CartEntity): Promise<void> {
    await this.clientStorage.insert(
      CartRepositoryImplementation.KEY_STORAGE,
      cart,
    );
  }

  public async getCart(): Promise<CartEntity> {
    const result = await this.clientStorage.select<CartEntity>(
      CartRepositoryImplementation.KEY_STORAGE,
    );

    return result ?? {};
  }

  public async insertProduct(product: ProductEntity): Promise<void> {
    let cart = await this.getCart();

    if (!cart[product.id]) {
      cart = {
        ...cart,
        [product.id]: {
          product,
          quantity: 1,
        },
      };
    } else {
      cart[product.id].quantity += 1;
    }

    await this.setCart(cart);
  }

  public async updateProduct(
    productId: number,
    quantity: number,
  ): Promise<void> {
    const cart = await this.getCart();

    if (!cart[productId]) {
      throw new Error('Product not found');
    }

    const cartProduct = cart[productId];

    cartProduct.quantity = quantity;

    const update: CartEntity = {
      ...cart,
      [productId]: cartProduct,
    };

    await this.setCart(update);
  }

  public async deleteProduct(productId: number): Promise<void> {
    const cart = await this.getCart();

    if (!cart[productId]) {
      throw new Error('Product not found');
    }

    delete cart[productId];
    await this.setCart(cart);
  }

  public async clear(): Promise<void> {
    await this.clientStorage.delete(CartRepositoryImplementation.KEY_STORAGE);
  }
}
