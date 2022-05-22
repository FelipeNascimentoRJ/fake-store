import React, {PropsWithChildren, createElement} from 'react';
import {StyleProp, TextProps} from 'react-native';

import * as TypographyVariant from './styles';

export type TypographyProps = {
  variant: keyof typeof TypographyVariant;
  style?: StyleProp<TextProps>;
};

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  variant,
  children,
  style,
}) => {
  const typographyComponent = TypographyVariant[variant];

  return createElement(typographyComponent, {style}, children);
};

export default React.memo(Typography);
