import React from 'react';

import {Container, Title} from './styles';

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Title>HomeScreen</Title>
    </Container>
  );
};

export default React.memo(HomeScreen);
