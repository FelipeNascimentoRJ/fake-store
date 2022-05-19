export interface ClientStorageAdapter {
  select: <T>(key: string) => Promise<T | undefined>;
  insert: <T>(key: string, value: T) => Promise<void>;
  delete: (key: string) => Promise<void>;
}
