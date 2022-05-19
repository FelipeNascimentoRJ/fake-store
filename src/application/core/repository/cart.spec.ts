import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {CartRepositoryImplementation} from './cart';
import {CartEntity} from '../../domain/entity/cart';
import {ProductEntity} from '../../domain/entity/product';
import {CartRepository} from '../../domain/repository/cart';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';

const KEY_STORAGE = '@FakeStore/cart';

type SutType = {
  sut: CartRepository;
  cart: CartEntity;
  product: ProductEntity;
  clientStorage?: ClientStorageAdapter;
};

const makeClientStorageAdapterStub = (): ClientStorageAdapter => {
  class ClientStorageStub implements ClientStorageAdapter {
    public async insert(_key: string, _value: any): Promise<void> {
      return Promise.resolve();
    }

    public async select<T>(_key: string): Promise<T> {
      return Promise.resolve({} as T);
    }

    public async delete(_key: string): Promise<void> {}
  }

  return new ClientStorageStub();
};

const makeSut = (withClientStorage = false): SutType => {
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

  const cart: CartEntity = {
    [product.id]: {
      product,
      quantity: 1,
    },
  };

  if (withClientStorage) {
    const clientStorage = makeClientStorageAdapterStub();
    const sut = new CartRepositoryImplementation(clientStorage);

    return {sut, clientStorage, cart, product} as SutType;
  }

  const sut = new CartRepositoryImplementation();

  return {sut, cart, product} as SutType;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('CartRepositoryImplementation', () => {
  it('should throw an error when there is no storage client available', () => {
    jest.spyOn(Container, 'has').mockReturnValueOnce(false);

    expect(() => makeSut()).toThrow();
  });

  it('should check if storage client is available', () => {
    const containerSpy = jest.spyOn(Container, 'has');

    makeSut();
    expect(containerSpy).toBeCalledTimes(1);
    expect(containerSpy).toHaveBeenCalledWith(Symbols.adapters.clientStorage);
  });

  it('should resolve storage client available', () => {
    const containerSpy = jest.spyOn(Container, 'resolve');

    makeSut();
    expect(containerSpy).toBeCalledTimes(1);
    expect(containerSpy).toHaveBeenCalledWith(Symbols.adapters.clientStorage);
  });

  it('should call insert method of clientStorage when using setCart with key and argument "cart"', async () => {
    const {sut, clientStorage} = makeSut(true);

    const clientStorageSpy = jest.spyOn(
      clientStorage as ClientStorageAdapter,
      'insert',
    );

    await sut.setCart({});

    expect(clientStorageSpy).toBeCalledTimes(1);
    expect(clientStorageSpy).toHaveBeenCalledWith(KEY_STORAGE, {});
  });

  it('should call select method of clientStorage when using getCart with key', async () => {
    const {sut, clientStorage} = makeSut(true);

    const clientStorageSpy = jest.spyOn(
      clientStorage as ClientStorageAdapter,
      'select',
    );

    await sut.getCart();

    expect(clientStorageSpy).toBeCalledTimes(1);
    expect(clientStorageSpy).toHaveBeenCalledWith(KEY_STORAGE);
  });

  it('should call setCart method of CartRepository when using insertProduct with "product" argument', async () => {
    const {sut, product} = makeSut(false);

    const sutSpy = jest.spyOn(sut, 'setCart');

    await sut.insertProduct(product);

    expect(sutSpy).toBeCalledTimes(1);
    expect(sutSpy).toHaveBeenCalledWith({
      [product.id]: {
        product,
        quantity: 1,
      },
    });
  });

  it('should call setCart method of CartRepository when using updateProduct with "productId" and "quantity" argument', async () => {
    const {sut, cart, product} = makeSut(false);

    const sutSpy = jest.spyOn(sut, 'setCart');

    await sut.setCart(cart);
    await sut.updateProduct(product.id, 2);

    expect(sutSpy).toBeCalledTimes(2);
    expect(sutSpy).toHaveBeenCalledWith({
      [product.id]: {
        product,
        quantity: 2,
      },
    });
  });

  it('should throw an error when trying to update product when not in cart', async () => {
    const {sut} = makeSut(false);

    const sutSpy = jest.spyOn(sut, 'setCart');

    await sut.setCart({});
    const promise = sut.updateProduct(1, 2);

    await expect(promise).rejects.toThrow();
    await expect(promise).rejects.toThrow(Error);
    await expect(promise).rejects.toThrow('Product not found');

    // assertion last not to break the test
    expect(sutSpy).toBeCalledTimes(1);
  });

  it('deve chamar o método setCart de CartRepository ao usar deleteProduct com o argumento "productId"', async () => {
    const {sut, cart, product} = makeSut(false);

    const sutSpy = jest.spyOn(sut, 'setCart');

    await sut.setCart(cart);
    await sut.deleteProduct(product.id);

    expect(sutSpy).toBeCalledTimes(2);
    expect(sutSpy).toHaveBeenCalledWith({});
  });

  it('should throw an error when trying to delete product when not in cart', async () => {
    const {sut} = makeSut(false);

    const sutSpy = jest.spyOn(sut, 'setCart');

    const promise = sut.deleteProduct(1);

    await expect(promise).rejects.toThrow();
    await expect(promise).rejects.toThrow(Error);
    await expect(promise).rejects.toThrow('Product not found');

    // assertion last not to break the test
    expect(sutSpy).toBeCalledTimes(0);
  });

  it('should call delete method of clientStorage when using clear with key', async () => {
    const {sut, clientStorage} = makeSut(true);

    const clientStorageSpy = jest.spyOn(
      clientStorage as ClientStorageAdapter,
      'delete',
    );

    await sut.clear();

    expect(clientStorageSpy).toBeCalledTimes(1);
    expect(clientStorageSpy).toHaveBeenCalledWith(KEY_STORAGE);
  });
});
