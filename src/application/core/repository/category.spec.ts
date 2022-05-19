import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {CategoryRepositoryImplementation} from './category';
import {CategoryRepository} from '../../domain/repository/category';

const makeSut = (): CategoryRepository => {
  return new CategoryRepositoryImplementation();
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('CategoryRepositoryImplementation', () => {
  it('should throw an error when there is no http client available', () => {
    jest.spyOn(Container, 'has').mockReturnValueOnce(false);

    expect(() => makeSut()).toThrow();
  });

  it('should check if http client is available', () => {
    const containerSpy = jest.spyOn(Container, 'has');

    makeSut();
    expect(containerSpy).toBeCalledTimes(1);
    expect(containerSpy).toHaveBeenCalledWith(Symbols.adapters.clientHttp);
  });

  it('should resolve http client available', () => {
    const containerSpy = jest.spyOn(Container, 'resolve');

    makeSut();
    expect(containerSpy).toBeCalledTimes(1);
    expect(containerSpy).toHaveBeenCalledWith(Symbols.adapters.clientHttp);
  });

  it('should make http request with getAllCategories method', async () => {
    const sut = makeSut();

    const response = await sut.getAllCategories();

    expect(response).toBeTruthy();
  });
});
