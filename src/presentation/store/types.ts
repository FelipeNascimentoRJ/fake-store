export type ErrorState = {
  code: number;
  message: string;
};

export type ProductRatingState = {
  rate: number;
  count: number;
};

export type ProductState = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRatingState;
};

export type CategoriesState = {
  loading: boolean;
  error: ErrorState | null;
  categories: string[];
};

export type ProductsState = {
  loading: boolean;
  error: ErrorState | null;
  products: ProductState[];
};

export type CartProductState = {
  product: ProductState;
  quantity: number;
};

export type CartListState = {
  [productId: number]: CartProductState;
};

export type CartState = {
  error: ErrorState | null;
  cart: CartListState;
};

export type ApplicationState = {
  cart: CartState;
  products: ProductsState;
  categories: CategoriesState;
};
