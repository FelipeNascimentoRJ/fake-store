import Symbols from './symbols';
import Container from './container';
import {ProductRepositoryImplementation} from './core/repository/product';
import {CategoryRepositoryImplementation} from './core/repository/category';
import ClientHttpAxiosAdapter from './infra/http/client-http-axios-adapter';

// Register adapters
Container.register(Symbols.adapters.clientHttp, ClientHttpAxiosAdapter);

// Register repositories
Container.register(
  Symbols.repositories.product,
  ProductRepositoryImplementation,
);

Container.register(
  Symbols.repositories.category,
  CategoryRepositoryImplementation,
);
