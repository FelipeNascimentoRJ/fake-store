import Symbols from './symbols';
import Container from './container';
import {ProductRepositoryImplementation} from './core/repository/product';
import {CategoryRepositoryImplementation} from './core/repository/category';
import ClientHttpAxiosAdapter from './infra/http/client-http-axios-adapter';
import ClientStorageAsyncStorageAdapter from './infra/storage/client-storage-async-storage-adapter';

// Register adapters
Container.register(Symbols.adapters.clientHttp, ClientHttpAxiosAdapter);
Container.register(
  Symbols.adapters.clientStorage,
  ClientStorageAsyncStorageAdapter,
);

// Register repositories
Container.register(
  Symbols.repositories.product,
  ProductRepositoryImplementation,
);

Container.register(
  Symbols.repositories.category,
  CategoryRepositoryImplementation,
);
