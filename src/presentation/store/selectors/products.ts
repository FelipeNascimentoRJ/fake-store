import {createSelector} from '@reduxjs/toolkit';

import {getStateSelector} from './state';

export const getProductsSelector = createSelector(
  getStateSelector,
  data => data.products,
);
