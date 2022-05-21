import {createSelector} from '@reduxjs/toolkit';

import {getStateSelector} from './state';

export const getCategoriesSelector = createSelector(
  getStateSelector,
  data => data.categories,
);
