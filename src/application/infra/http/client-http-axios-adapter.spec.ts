import axios from 'axios';

import {
  ClientHttpError,
  ClientHttpAdapter,
} from '../../core/protocols/adapter/client-http';
import {ProductEntity} from '../../domain/entity/product';
import ClientHttpAxiosAdapter from '././client-http-axios-adapter';

const makeSut = (): ClientHttpAdapter => {
  return new ClientHttpAxiosAdapter();
};

beforeAll(() => jest.setTimeout(60 * 1000));

describe('ClientHttpAxiosAdapter', () => {
  it('should make http request with get method', async () => {
    const sut = makeSut();
    const url = 'https://fakestoreapi.com/products';

    const response = await sut.get(url);

    expect(response).toBeTruthy();
  });

  it('should call get method with not url', async () => {
    const sut = makeSut();

    const promise = sut.get('');

    await expect(promise).rejects.toThrow(ClientHttpError);
  });

  it('should call get method with correct url and params', async () => {
    const sut = makeSut();
    const params = {limit: 5};
    const url = 'https://fakestoreapi.com/products';

    const axiosSpy = jest.spyOn(axios, 'get');

    const response = await sut.get<ProductEntity[]>(url, params);

    expect(response.body.length).toBe(5);
    expect(axiosSpy).toHaveBeenCalledWith(url, {params});
  });

  it('should call get method with invalid url', async () => {
    const sut = makeSut();
    const url = 'https://any-url.com';

    const promise = sut.get(url);

    await expect(promise).rejects.toThrow();
    await expect(promise).rejects.toThrow(ClientHttpError);
  });
});
