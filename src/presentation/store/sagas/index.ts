import {all} from 'redux-saga/effects';

import Cart from './cart';
import Products from './products';
import Categories from './categories';

const sagasList = [Cart(), Products(), Categories()];

export default function* rootSagas(): Generator {
  return yield all(sagasList);
}
