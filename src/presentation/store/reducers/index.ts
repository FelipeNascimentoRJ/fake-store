import {Cart} from './cart';
import {Products} from './products';
import {Categories} from './categories';

export default {
  cart: Cart.reducer,
  products: Products.reducer,
  categories: Categories.reducer,
};
