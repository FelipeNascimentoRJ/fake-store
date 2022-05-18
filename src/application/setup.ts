import Symbols from './symbols';
import Container from './container';
import {ProductRepositoryImplementation} from './core/repository/product';
import ClientHttpAxiosAdapter from './infra/http/client-http-axios-adapter';

// Register adapters
Container.register(Symbols.adapters.clientHttp, ClientHttpAxiosAdapter);

// Register repositories
Container.register(
  Symbols.repositories.product,
  ProductRepositoryImplementation,
);
