import '../../setup';

import Symbols from '../../symbols';
import Container from '../../container';
import {ProductRepositoryImplementation} from './product';
import {ProductRepository} from '../../domain/repository/product';

const makeSut = (): ProductRepository => {
  return new ProductRepositoryImplementation();
};

beforeAll(() => jest.setTimeout(60 * 1000));

afterEach(() => {
  jest.clearAllMocks();
});

describe('ProductRepositoryImplementation', () => {
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

  it('should make http request with getAllProducts method', async () => {
    const sut = makeSut();

    const response = await sut.getAllProducts();

    expect(response).toBeTruthy();
  });

  it('should make http request with getProductsByCategory method by category "jewelery"', async () => {
    const sut = makeSut();
    const category = 'jewelery';

    const response = await sut.getProductsByCategory(category);
    const haveDifferentCategories = response.some(
      product => product.category !== category,
    );

    expect(response).toBeTruthy();
    expect(haveDifferentCategories).toEqual(false);
  });
});
