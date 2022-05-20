import React from 'react';

import Button from '../button';
import {useTheme} from '../../theme';

import {Container} from './styles';

export type FooterActionButtonProps = {
  color?: string;
  colorText?: string;
  colorButton?: string;
  withShadow?: boolean;
  rounded?: boolean;
  title: string;
  onPress: () => void;
};

const FooterActionButton: React.FC<FooterActionButtonProps> = ({
  color,
  colorText,
  colorButton,
  withShadow = true,
  rounded = true,
  title,
  onPress,
}) => {
  const theme = useTheme();

  const colorContainer = color || theme.colors.white;
  const colorTextButton = colorText || theme.colors.white;
  const colorBackgroundButton = colorButton || theme.colors.primaryLight;

  return (
    <Container color={colorContainer} rounded={rounded} withShadow={withShadow}>
      <Button
        title={title}
        color={colorBackgroundButton}
        colorText={colorTextButton}
        onPress={onPress}
        withShadow={withShadow}
      />
    </Container>
  );
};

export default React.memo(FooterActionButton);
