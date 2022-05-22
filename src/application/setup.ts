import Symbols from './symbols';
import Container from './container';

import {CartRepositoryImplementation} from './core/repository/cart';
import {ProductRepositoryImplementation} from './core/repository/product';
import {CategoryRepositoryImplementation} from './core/repository/category';

import {LoadCartUseCaseImplementation} from './core/use-case/load-cart';
import {LoadProductsUseCaseImplementation} from './core/use-case/load-products';
import {LoadCategoriesUseCaseImplementation} from './core/use-case/load-categories';
import {LoadProductsByCategoryUseCaseImplementation} from './core/use-case/load-products-by-category';

import {ClearCartUseCaseImplementation} from './core/use-case/clear-cart';
import {AddCartProductUseCaseImplementation} from './core/use-case/add-cart-product';
import {ReduceCartProductUseCaseImplementation} from './core/use-case/reduce-cart-product';

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

Container.register(Symbols.repositories.cart, CartRepositoryImplementation);

// Register use cases
Container.register(Symbols.useCases.loadCart, LoadCartUseCaseImplementation);

Container.register(
  Symbols.useCases.loadProductsByCategory,
  LoadProductsByCategoryUseCaseImplementation,
);

Container.register(
  Symbols.useCases.loadProducts,
  LoadProductsUseCaseImplementation,
);
Container.register(
  Symbols.useCases.loadCategories,
  LoadCategoriesUseCaseImplementation,
);

Container.register(
  Symbols.useCases.addCartProduct,
  AddCartProductUseCaseImplementation,
);

Container.register(
  Symbols.useCases.reduceCartProduct,
  ReduceCartProductUseCaseImplementation,
);

Container.register(Symbols.useCases.clearCart, ClearCartUseCaseImplementation);
