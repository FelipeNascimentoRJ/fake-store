import React from 'react';
import {ProductState} from '../../store';

import Icon from '../icons';
import Text from '../typography';

import {
  Container,
  ImageContainer,
  Image,
  PriceContainer,
  AddProductToCardButton,
} from './styles';

export type ProductCardRatingProps = {
  rate: number;
  count: number;
};

export type ProductCardProps = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: number;
  rating: ProductCardRatingProps;
};

export type CardProps = {
  isNews?: boolean;
  withMargin?: boolean;
  product: ProductState;
  onAddProductToCartPress: (product: ProductCardProps) => void;
};

const Card: React.FC<CardProps> = ({
  product,
  isNews = false,
  withMargin = true,
  onAddProductToCartPress,
}) => {
  const _onPress = () => {
    onAddProductToCartPress && onAddProductToCartPress(product);
  };

  const renderAddProductToCartButton = (
    <AddProductToCardButton isNews={isNews} onPress={_onPress}>
      <Icon name="IconAddPrimary" />
    </AddProductToCardButton>
  );

  return (
    <Container isNews={isNews} withMargin={withMargin}>
      <ImageContainer>
        <Image
          isNews={isNews}
          resizeMode="stretch"
          source={{
            uri: product.image,
          }}
        />
      </ImageContainer>
      <Text variant="ProductCategory">{product.category}</Text>
      <Text variant="ProductTitle">{product.title}</Text>
      {isNews && (
        <Text variant="ProductDescription">{product.description}</Text>
      )}
      <PriceContainer isNews={isNews}>
        <Text variant="ProductPrice">{`$${product.price}`}</Text>
        {renderAddProductToCartButton}
      </PriceContainer>
    </Container>
  );
};

export default React.memo(Card);
