import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {ProductEntity} from '../../domain/entity/product';
import {ProductRepository} from '../../domain/repository/product';
import {LoadProductsUseCaseImplementation} from './load-products';
import {LoadProductsUseCase} from '../../domain/use-case/load-products';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';

type SutType = {
  product: ProductEntity;
  sut: LoadProductsUseCase;
  repository?: ProductRepository;
  clientStorage?: ClientStorageAdapter;
};

const makeProductRepositoryStub = (): ProductRepository => {
  class ProductRepositoryStub implements ProductRepository {
    public async getAllProducts(): Promise<ProductEntity[]> {
      return [];
    }

    public async getProductsByCategory(
      _category: string,
    ): Promise<ProductEntity[]> {
      return [];
    }
  }

  return new ProductRepositoryStub();
};

const makeClientStorageAdapterStub = (): ClientStorageAdapter => {
  class ClientStorageAdapterStub implements ClientStorageAdapter {
    public async select<T>(_key: string): Promise<T | undefined> {
      return undefined;
    }

    public async insert<T>(_key: string, _value: T): Promise<void> {}

    public async delete(_key: string): Promise<void> {}
  }

  return new ClientStorageAdapterStub();
};

const makeSut = (withStub = false): SutType => {
  const product: ProductEntity = {
    id: 1,
    title: 'any_title',
    description: 'any_description',
    price: 1,
    category: 'any_category',
    image: 'any_image',
    rating: {
      rate: 1,
      count: 1,
    },
  };

  if (withStub) {
    const repository = makeProductRepositoryStub();
    const clientStorage = makeClientStorageAdapterStub();

    const sut = new LoadProductsUseCaseImplementation(
      repository,
      clientStorage,
    );

    return {sut, repository, clientStorage, product} as SutType;
  }

  const sut = new LoadProductsUseCaseImplementation();

  return {sut, product} as SutType;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('LoadProductsUseCaseImplementation', () => {
  it('should throw an error when there is no product repository available', () => {
    jest.spyOn(Container, 'has').mockReturnValueOnce(false);

    expect(() => makeSut()).toThrow();
  });

  it('should check if product repository is available', () => {
    const containerSpy = jest.spyOn(Container, 'has');

    makeSut();
    expect(containerSpy).toBeCalledTimes(3);
    expect(containerSpy).toHaveBeenNthCalledWith(
      1,
      Symbols.repositories.product,
    );
    expect(containerSpy).toHaveBeenNthCalledWith(
      2,
      Symbols.adapters.clientHttp,
    );
    expect(containerSpy).toHaveBeenNthCalledWith(
      3,
      Symbols.adapters.clientStorage,
    );
  });

  it('should try to load client storage if not available', () => {
    const containerSpy = jest
      .spyOn(Container, 'has')
      .mockImplementationOnce(() => true) // ProductRepository
      .mockImplementationOnce(() => true) // ClientHttp
      .mockImplementationOnce(() => false); // ClientStorage

    const {sut} = makeSut();

    // @ts-ignore
    expect(sut.clientStorage).toEqual(undefined);
    expect(containerSpy).toBeCalledTimes(3);
  });

  it('should call getAllProducts method of repository when using execute', async () => {
    const {sut, repository} = makeSut(true);

    const repositorySpy = jest.spyOn(
      repository as ProductRepository,
      'getAllProducts',
    );

    const result = await sut.execute();

    expect(repositorySpy).toBeCalledTimes(1);
    expect(result).toBeTruthy();
    expect(result).toEqual([]);
  });

  it('should call loadCache method of use case when using execute', async () => {
    const {sut, repository, product} = makeSut(true);

    const cache: ProductEntity[] = [product];

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache').mockResolvedValueOnce(cache);

    const repositorySpy = jest.spyOn(
      repository as ProductRepository,
      'getAllProducts',
    );

    const result = await sut.execute();

    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(0);
    expect(result).toBeTruthy();
    expect(result).toEqual(cache);
  });

  it('should call saveCache method of use case when using execute when getAllProducts return values', async () => {
    const {sut, repository, product} = makeSut(true);

    // @ts-ignore
    const sutLoadSpy = jest.spyOn(sut, 'loadCache').mockResolvedValueOnce([]);

    // @ts-ignore
    const sutSaveSpy = jest.spyOn(sut, 'saveCache');

    const repositorySpy = jest
      .spyOn(repository as ProductRepository, 'getAllProducts')
      .mockResolvedValueOnce([product]);

    const result = await sut.execute();

    expect(sutLoadSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(1);
    expect(sutSaveSpy).toBeCalledTimes(1);
    expect(sutSaveSpy).toHaveBeenCalledWith([product]);
    expect(result).toEqual([product]);
  });

  it('should return empty array if no storage client is available', async () => {
    const {sut, repository, product} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');
    const repositorySpy = jest
      .spyOn(repository as ProductRepository, 'getAllProducts')
      .mockResolvedValueOnce([product]);

    // @ts-ignore
    sut.clientStorage = undefined;
    const result = await sut.execute();

    expect(result).toEqual([product]);
    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(1);
  });

  it('should return cache array if there is client storage available', async () => {
    const {sut, repository, clientStorage, product} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');

    const repositorySpy = jest.spyOn(
      repository as ProductRepository,
      'getAllProducts',
    );

    const clientStorageSpy = jest
      .spyOn(clientStorage as ClientStorageAdapter, 'select')
      .mockResolvedValueOnce([product]);

    const result = await sut.execute();

    expect(result).toEqual([product]);
    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(0);
    expect(clientStorageSpy).toBeCalledTimes(1);
  });

  it('should return empty cache array if no cache is saved', async () => {
    const {sut, repository, clientStorage} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');

    const repositorySpy = jest
      .spyOn(repository as ProductRepository, 'getAllProducts')
      .mockResolvedValueOnce([]);

    const clientStorageSpy = jest.spyOn(
      clientStorage as ClientStorageAdapter,
      'select',
    );

    const result = await sut.execute();

    expect(result).toEqual([]);
    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(1);
    expect(clientStorageSpy).toBeCalledTimes(1);
  });
});
