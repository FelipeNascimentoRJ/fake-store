import asyncStorage from '@react-native-async-storage/async-storage';

import {ClientStorageAdapter} from '../../core/protocols/adapter/client-storage';

export default class ClientStorageAsyncStorageAdapter
  implements ClientStorageAdapter
{
  public async select<T>(key: string): Promise<T | undefined> {
    if (!key) {
      throw new Error('key is required');
    }

    const value = await asyncStorage.getItem(key);

    return value ? JSON.parse(value) : undefined;
  }

  public async insert<T>(key: string, value: T): Promise<void> {
    if (!key) {
      throw new Error('key is required');
    }

    if (!value) {
      throw new Error('value is required');
    }

    await asyncStorage.setItem(key, JSON.stringify(value));
  }

  public async delete(key: string): Promise<void> {
    if (!key) {
      throw new Error('key is required');
    }

    await asyncStorage.removeItem(key);
  }
}
