import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {CartEntity} from '../../domain/entity/cart';
import {ProductEntity} from '../../domain/entity/product';
import {CartRepository} from '../../domain/repository/cart';
import {AddCartProductUseCaseImplementation} from './add-cart-product';
import {AddCartProductUseCase} from '../../domain/use-case/add-cart-product';

type SutType = {
  product: ProductEntity;
  sut: AddCartProductUseCase;
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
  const product: ProductEntity = {
    id: 1,
    title: 'any_title',
    price: 10.55,
    category: 'any_category',
    description: 'any_description',
    image: 'any_image',
    rating: {
      rate: 1,
      count: 1,
    },
  };

  if (withCartRepository) {
    const repository = makeCartRepositoryStub();
    const sut = new AddCartProductUseCaseImplementation(repository);

    return {sut, repository, product} as SutType;
  }

  const sut = new AddCartProductUseCaseImplementation();

  return {sut, product} as SutType;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('AddCartProductUseCaseImplementation', () => {
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

  it('should throw an error when trying to use execute without the "product" argument', async () => {
    const {sut, repository} = makeSut(true);

    const repositorySpy = jest.spyOn(
      repository as CartRepository,
      'insertProduct',
    );

    // @ts-ignore
    const promise = sut.execute(undefined);

    await expect(promise).rejects.toThrow();
    await expect(promise).rejects.toThrow(Error);
    await expect(promise).rejects.toThrow('Product is required');

    // assertion last not to break the test
    expect(repositorySpy).toBeCalledTimes(0);
  });

  it('should call insertProduct method of repository when using execute with argument "product"', async () => {
    const {sut, repository, product} = makeSut(true);

    const clientStorageSpy = jest.spyOn(
      repository as CartRepository,
      'insertProduct',
    );

    await sut.execute(product);

    expect(clientStorageSpy).toBeCalledTimes(1);
    expect(clientStorageSpy).toHaveBeenCalledWith(product);
  });
});
