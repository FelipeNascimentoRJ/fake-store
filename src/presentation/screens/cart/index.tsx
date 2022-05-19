import React from 'react';

import {Container, Title} from './styles';

const CartScreen: React.FC = () => {
  return (
    <Container>
      <Title>CartScreen</Title>
    </Container>
  );
};

export default React.memo(CartScreen);
