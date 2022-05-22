import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Container, Column} from './styles';

export type HeaderProps = {
  spacingTop?: number;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({spacingTop, left, center, right}) => {
  const {top} = useSafeAreaInsets();

  return (
    <Container marginTop={spacingTop ?? top}>
      <Column>{left && left}</Column>
      <Column>{center && center}</Column>
      <Column>{right && right}</Column>
    </Container>
  );
};

export default React.memo(Header);
