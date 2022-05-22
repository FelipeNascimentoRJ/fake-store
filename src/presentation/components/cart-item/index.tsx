import React, {useCallback} from 'react';

import Icon from '../icons';
import Text from '../typography';

import {
  Container,
  ImageContainer,
  Image,
  DataContainer,
  PriceContainer,
  GroupButtonContainer,
  GroupButtonLeft,
  GroupButtonRight,
} from './styles';

export type CartItemProps = {
  data: any;
  onAddOnePress: (product: any) => void;
  onReduceOnePress: (product: any) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  data,
  onAddOnePress,
  onReduceOnePress,
}) => {
  const {product, quantity} = data;

  const _onAddOnePress = useCallback(() => {
    onAddOnePress && onAddOnePress(data);
  }, [onAddOnePress, data]);

  const _onReduceOnePress = useCallback(() => {
    onReduceOnePress && onReduceOnePress(data);
  }, [onReduceOnePress, data]);

  return (
    <Container>
      <ImageContainer>
        <Image
          resizeMode="stretch"
          source={{
            uri: product.image,
          }}
        />
      </ImageContainer>
      <DataContainer>
        <Text variant="ProductTitle">{product.title}</Text>
        <PriceContainer>
          <Text variant="ProductCartQuantityItem">{`${quantity}x`}</Text>
          <Text variant="ProductCartPriceItem">{`${product.price}`}</Text>
        </PriceContainer>
      </DataContainer>
      <GroupButtonContainer>
        <GroupButtonLeft onPress={_onReduceOnePress}>
          <Icon name="IconReduce" />
        </GroupButtonLeft>
        <GroupButtonRight onPress={_onAddOnePress}>
          <Icon name="IconAdd" />
        </GroupButtonRight>
      </GroupButtonContainer>
    </Container>
  );
};

export default React.memo(CartItem);
