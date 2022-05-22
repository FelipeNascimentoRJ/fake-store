import {put, takeLatest} from 'redux-saga/effects';

import Symbols from '../../../application/symbols';
import Container from '../../../application/container';
import {LoadCategoriesUseCase} from '../../../application/domain/use-case/load-categories';

import {ErrorState} from '../types';
import {Categories} from '../reducers/categories';

function* loadMiddleware(): unknown {
  try {
    const useCase = Container.resolve<LoadCategoriesUseCase>(
      Symbols.useCases.loadCategories,
    );

    if (!useCase) {
      return;
    }

    const categories = yield useCase.execute();

    yield put(Categories.actions.loadSuccess(categories));
  } catch (error) {
    yield put(Categories.actions.loadFailure(error as ErrorState));
  }
}

export default function* root() {
  yield takeLatest(Categories.actions.loadMiddleware, loadMiddleware);
}
