import React from 'react';

import {Container, Title} from './styles';

const ConfirmationScreen: React.FC = () => {
  return (
    <Container>
      <Title>ConfirmationScreen</Title>
    </Container>
  );
};

export default React.memo(ConfirmationScreen);
