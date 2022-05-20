import React from 'react';

import {Container, Title} from './styles';

export type ButtonProps = {
  color?: string;
  colorText?: string;
  withShadow?: boolean;
  title: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({
  color = 'transparent',
  colorText = '#000',
  withShadow = true,
  title,
  onPress,
}) => {
  return (
    <Container color={color} withShadow={withShadow} onPress={onPress}>
      <Title color={colorText}>{title}</Title>
    </Container>
  );
};

export default React.memo(Button);
