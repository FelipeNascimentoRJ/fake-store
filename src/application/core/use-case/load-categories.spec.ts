import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {CategoryRepository} from '../../domain/repository/category';
import {LoadCategoriesUseCaseImplementation} from './load-categories';
import {ClientStorageAdapter} from '../protocols/adapter/client-storage';
import {LoadCategoriesUseCase} from '../../domain/use-case/load-categories';

type SutType = {
  sut: LoadCategoriesUseCase;
  repository?: CategoryRepository;
  clientStorage?: ClientStorageAdapter;
};

const makeCategoryRepositoryStub = (): CategoryRepository => {
  class CategoryRepositoryStub implements CategoryRepository {
    public async getAllCategories(): Promise<string[]> {
      return [];
    }
  }

  return new CategoryRepositoryStub();
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
  if (withStub) {
    const repository = makeCategoryRepositoryStub();
    const clientStorage = makeClientStorageAdapterStub();

    const sut = new LoadCategoriesUseCaseImplementation(
      repository,
      clientStorage,
    );

    return {sut, repository, clientStorage} as SutType;
  }

  const sut = new LoadCategoriesUseCaseImplementation();

  return {sut} as SutType;
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('LoadCategoriesUseCaseImplementation', () => {
  it('should throw an error when there is no category repository available', () => {
    jest.spyOn(Container, 'has').mockReturnValueOnce(false);

    expect(() => makeSut()).toThrow();
  });

  it('should check if category repository is available', () => {
    const containerSpy = jest.spyOn(Container, 'has');

    makeSut();
    expect(containerSpy).toBeCalledTimes(3);
    expect(containerSpy).toHaveBeenNthCalledWith(
      1,
      Symbols.repositories.category,
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
      .mockImplementationOnce(() => true) // CategoryRepository
      .mockImplementationOnce(() => true) // ClientHttp
      .mockImplementationOnce(() => false); // ClientStorage

    const {sut} = makeSut();

    // @ts-ignore
    expect(sut.clientStorage).toEqual(undefined);
    expect(containerSpy).toBeCalledTimes(3);
  });

  it('should call getAllCategories method of repository when using execute', async () => {
    const {sut, repository} = makeSut(true);

    const repositorySpy = jest.spyOn(
      repository as CategoryRepository,
      'getAllCategories',
    );

    const result = await sut.execute();

    expect(repositorySpy).toBeCalledTimes(1);
    expect(result).toBeTruthy();
    expect(result).toEqual([]);
  });

  it('should call loadCache method of use case when using execute', async () => {
    const {sut, repository} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache').mockResolvedValueOnce(['all']);

    const repositorySpy = jest.spyOn(
      repository as CategoryRepository,
      'getAllCategories',
    );

    const result = await sut.execute();

    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(0);
    expect(result).toBeTruthy();
    expect(result).toEqual(['all']);
  });

  it('should call saveCache method of use case when using execute when getAllCategories return values', async () => {
    const {sut, repository} = makeSut(true);

    // @ts-ignore
    const sutLoadSpy = jest.spyOn(sut, 'loadCache').mockResolvedValueOnce([]);

    // @ts-ignore
    const sutSaveSpy = jest.spyOn(sut, 'saveCache');

    const repositorySpy = jest
      .spyOn(repository as CategoryRepository, 'getAllCategories')
      .mockResolvedValueOnce(['all']);

    const result = await sut.execute();

    expect(sutLoadSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(1);
    expect(sutSaveSpy).toBeCalledTimes(1);
    expect(sutSaveSpy).toHaveBeenCalledWith(['all']);
    expect(result).toEqual(['all']);
  });

  it('should return empty array if no storage client is available', async () => {
    const {sut, repository} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');
    const repositorySpy = jest
      .spyOn(repository as CategoryRepository, 'getAllCategories')
      .mockResolvedValueOnce(['all']);

    // @ts-ignore
    sut.clientStorage = undefined;
    const result = await sut.execute();

    expect(result).toEqual(['all']);
    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(1);
  });

  it('should return cache array if there is client storage available', async () => {
    const {sut, repository, clientStorage} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');

    const repositorySpy = jest.spyOn(
      repository as CategoryRepository,
      'getAllCategories',
    );

    const clientStorageSpy = jest
      .spyOn(clientStorage as ClientStorageAdapter, 'select')
      .mockResolvedValueOnce(['all']);

    const result = await sut.execute();

    expect(result).toEqual(['all']);
    expect(sutSpy).toBeCalledTimes(1);
    expect(repositorySpy).toBeCalledTimes(0);
    expect(clientStorageSpy).toBeCalledTimes(1);
  });

  it('should return empty cache array if no cache is saved', async () => {
    const {sut, repository, clientStorage} = makeSut(true);

    // @ts-ignore
    const sutSpy = jest.spyOn(sut, 'loadCache');

    const repositorySpy = jest
      .spyOn(repository as CategoryRepository, 'getAllCategories')
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
