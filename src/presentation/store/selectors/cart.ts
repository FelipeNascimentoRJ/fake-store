import {createSelector} from '@reduxjs/toolkit';

import {getStateSelector} from './state';

export const getCartSelector = createSelector(
  getStateSelector,
  data => data.cart,
);
