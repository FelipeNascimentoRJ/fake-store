import React from 'react';
import {Container, Text} from './styles';

export type ChipProps = {
  category: string;
  checked?: boolean;
  onPress: (category: string) => void;
};

const Chip: React.FC<ChipProps> = ({checked = false, category, onPress}) => {
  const _onPress = () => {
    onPress && onPress(category);
  };

  return (
    <Container checked={checked} onPress={_onPress}>
      <Text checked={checked}>{category}</Text>
    </Container>
  );
};

export default React.memo(Chip);
