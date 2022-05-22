import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {CartEntity} from '../../domain/entity/cart';
import {ProductEntity} from '../../domain/entity/product';
import {CartRepository} from '../../domain/repository/cart';

import {LoadCartUseCaseImplementation} from './load-cart';
import {LoadCartUseCase} from '../../domain/use-case/load-cart';

type SutType = {
  sut: LoadCartUseCase;
  repository?: CartRepository;
};

const makeCartRepositoryStub = (): CartRepository => {
  class CartRepositoryStub implements CartRepository {
    public async setCart(_cart: CartEntity): Promise<void> {
      //
    }

    public async getCart(): Promise<CartEntity> {
      return {};
    }

    public async insertProduct(_product: ProductEntity): Promise<void> {}

    public async updateProduct(
      _productId: number,
      _quantity: number,
    ): Promise<void> {}

    public async deleteProduct(_productId: number): Promise<void> {
      //
    }

    public async clear(): Promise<void> {
      //
    }
  }

  return new CartRepositoryStub();
};

const makeSut = (withCartRepository = false): SutType => {
  if (withCartRepository) {
    const repository = makeCartRepositoryStub();
    const sut = new LoadCartUseCaseImplementation(repository);

    return {sut, repository} as SutType;
  }

  const sut = new LoadCartUseCaseImplementation();

  return {sut} as SutType;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('ClearCartUseCaseImplementation', () => {
  it('should throw an error when there is no cart repository available', () => {
    jest.spyOn(Container, 'has').mockReturnValueOnce(false);

    expect(() => makeSut()).toThrow();
  });

  it('should check if cart repository is available', () => {
    const containerSpy = jest.spyOn(Container, 'has');

    makeSut();
    expect(containerSpy).toBeCalledTimes(2);
    expect(containerSpy).toHaveBeenNthCalledWith(1, Symbols.repositories.cart);
    expect(containerSpy).toHaveBeenNthCalledWith(
      2,
      Symbols.adapters.clientStorage,
    );
  });

  it('should call getCart method of repository when using execute', async () => {
    const {sut, repository} = makeSut(true);

    const clientStorageSpy = jest.spyOn(
      repository as CartRepository,
      'getCart',
    );

    const result = await sut.execute();

    expect(clientStorageSpy).toBeCalledTimes(1);
    expect(result).toBeTruthy();
    expect(result).toEqual({});
  });
});
