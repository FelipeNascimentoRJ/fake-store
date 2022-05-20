import {ProductCardProps} from '../../components';

export type CartProduct = {
  product: ProductCardProps;
  quantity: number;
};

export type Cart = {
  [productId: number]: CartProduct;
};

const helper = () => {
  let cart: Cart = {};

  for (let i = 1; i < 6; i++) {
    const product: ProductCardProps = {
      id: i,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      category: `Category ${i}`,
      title: `${i} Product title`,
      description: `${i} Product description`,
      price: Number((10.05 * i).toFixed(2)),
    };

    cart[product.id] = {
      product,
      quantity: i,
    };
  }

  return cart;
};

export default helper();
