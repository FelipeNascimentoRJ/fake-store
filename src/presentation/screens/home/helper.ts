import {ProductCardProps} from '../../components';

const helper = () => {
  const categories = [
    'Últimos',
    'Categoria 2',
    'Categoria 3',
    'Categoria 4',
    'Categoria 5',
    'Categoria 6',
  ];

  let products: ProductCardProps[] = [];

  for (let i = 1; i < 16; i++) {
    products.push({
      id: i,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      category: `Category ${i}`,
      title: `${i} Product title`,
      description: `${i} Product description`,
      price: Number((10.05 * i).toFixed(2)),
    });
  }

  return {
    categories,
    products,
  };
};

export default helper();
