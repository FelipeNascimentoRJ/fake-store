import {PayloadAction} from '@reduxjs/toolkit';
import {all, put, takeLatest} from 'redux-saga/effects';

import Symbols from '../../../application/symbols';
import Container from '../../../application/container';

import {LoadCartUseCase} from '../../../application/domain/use-case/load-cart';
import {ClearCartUseCase} from '../../../application/domain/use-case/clear-cart';
import {AddCartProductUseCase} from '../../../application/domain/use-case/add-cart-product';
import {ReduceCartProductUseCase} from '../../../application/domain/use-case/reduce-cart-product';

import {Cart} from '../reducers/cart';
import {ErrorState, ProductState} from '../types';

function* loadMiddleware(): unknown {
  try {
    const useCase = Container.resolve<LoadCartUseCase>(
      Symbols.useCases.loadCart,
    );

    if (!useCase) {
      return;
    }

    const cart = yield useCase.execute();

    yield put(Cart.actions.load(cart));
  } catch (error) {
    return;
  }
}

function* addOneMiddleware({
  payload: product,
}: PayloadAction<ProductState>): unknown {
  try {
    const useCase = Container.resolve<AddCartProductUseCase>(
      Symbols.useCases.addCartProduct,
    );

    if (!useCase) {
      return;
    }

    yield useCase.execute(product);

    yield put(Cart.actions.addOne(product));
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

function* reduceOneMiddleware({
  payload: productId,
}: PayloadAction<number>): unknown {
  try {
    const useCase = Container.resolve<ReduceCartProductUseCase>(
      Symbols.useCases.reduceCartProduct,
    );

    if (!useCase) {
      return;
    }

    yield useCase.execute(productId);

    yield put(Cart.actions.reduceOne(productId));
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

function* clearMiddleware(): unknown {
  try {
    const useCase = Container.resolve<ClearCartUseCase>(
      Symbols.useCases.clearCart,
    );

    if (!useCase) {
      return;
    }

    yield useCase.execute();

    yield put(Cart.actions.clear());
  } catch (error) {
    yield put(Cart.actions.failure(error as ErrorState));
  }
}

export default function* root() {
  yield all([
    takeLatest(Cart.actions.loadMiddleware, loadMiddleware),
    takeLatest(Cart.actions.clearMiddleware, clearMiddleware),
    takeLatest(Cart.actions.addOneMiddleware, addOneMiddleware),
    takeLatest(Cart.actions.reduceOneMiddleware, reduceOneMiddleware),
  ]);
}
