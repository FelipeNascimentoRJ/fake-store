import {put, takeLatest} from 'redux-saga/effects';

import {ErrorState} from '../types';
import {Categories} from '../reducers/categories';

function* loadMiddleware(): unknown {
  try {
    // TODO: load categories
    console.log('loadMiddleware');

    yield put(Categories.actions.loadSuccess([]));
  } catch (error) {
    yield put(Categories.actions.loadFailure(error as ErrorState));
  }
}

export default function* root() {
  yield takeLatest(Categories.actions.loadMiddleware, loadMiddleware);
}
