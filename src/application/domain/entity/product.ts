export type ProductRatingEntity = {
  rate: number;
  count: number;
};

export type ProductEntity = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRatingEntity;
};
