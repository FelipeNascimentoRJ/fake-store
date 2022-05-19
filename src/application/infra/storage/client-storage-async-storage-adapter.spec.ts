import asyncStorage from '@react-native-async-storage/async-storage';

import {ClientStorageAdapter} from '../../core/protocols/adapter/client-storage';
import ClientStorageAsyncStorageAdapter from './client-storage-async-storage-adapter';

const makeSut = (): ClientStorageAdapter => {
  return new ClientStorageAsyncStorageAdapter();
};

describe('ClientStorageAsyncStorageAdapter', () => {
  it('should throw an error if not pass the key to select', () => {
    const sut = makeSut();

    const promise = sut.select('');

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow(Error);
    expect(promise).rejects.toThrow('key is required');
  });

  it('should return undefined when there is no item corresponding to the key', async () => {
    const sut = makeSut();
    const key = 'any_key';

    const result = await sut.select(key);

    expect(result).toBeFalsy();
    expect(result).toEqual(undefined);
  });

  it('should call getItem method when selecting with corresponding key', async () => {
    const sut = makeSut();
    const key = 'select_key';
    const value = 'select_value';

    const asyncStorageSpy = jest.spyOn(asyncStorage, 'getItem');

    await sut.insert(key, value);
    const result = await sut.select(key);

    expect(result).toBeTruthy();
    expect(result).toEqual(value);
    expect(asyncStorageSpy).toBeCalledTimes(1);
    expect(asyncStorageSpy).toHaveBeenCalledWith(key);
  });

  it('should throw an error if not pass the key to insert', () => {
    const sut = makeSut();

    const promise = sut.insert('', 'insert_value');

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow(Error);
    expect(promise).rejects.toThrow('key is required');
  });

  it('should throw an error if not pass the value to insert', () => {
    const sut = makeSut();

    const promise = sut.insert('inset_key', '');

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow(Error);
    expect(promise).rejects.toThrow('value is required');
  });

  it('should call the setItem method when inserting with the corresponding key and value', async () => {
    const sut = makeSut();
    const key = 'insert_key';
    const value = 'insert_value';

    const asyncStorageSpy = jest.spyOn(asyncStorage, 'setItem');

    await sut.insert(key, value);

    expect(asyncStorageSpy).toBeCalledTimes(1);
    expect(asyncStorageSpy).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should throw an error if not pass the key to delete', () => {
    const sut = makeSut();

    const promise = sut.delete('');

    expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow(Error);
    expect(promise).rejects.toThrow('key is required');
  });

  it('should call removeItem method when deleting with corresponding key', async () => {
    const sut = makeSut();
    const key = 'delete_key';

    const asyncStorageSpy = jest.spyOn(asyncStorage, 'removeItem');

    await sut.delete(key);

    expect(asyncStorageSpy).toBeCalledTimes(1);
    expect(asyncStorageSpy).toHaveBeenCalledWith(key);
  });
});
