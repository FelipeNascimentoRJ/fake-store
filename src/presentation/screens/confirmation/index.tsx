import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';

import {useTheme} from '../../theme';
import {Icon, Text, FooterActionButton} from '../../components';

import {Container, Content} from './styles';

const ConfirmationScreen: React.FC = () => {
  const theme = useTheme();

  const navigateToHome = useCallback(() => {
    console.log('Navigate to home');
  }, []);

  const renderContent = (
    <Content>
      <Icon name="IconConfirm" />
      <Text variant="EmptyTitle">Sucesso!</Text>
      <Text variant="EmptyDescription">
        Compra realizada com sucesso, aproveite!
      </Text>
    </Content>
  );

  const renderFooter = (
    <FooterActionButton
      title="Prosseguir"
      rounded={false}
      withShadow={false}
      onPress={navigateToHome}
      color={theme.colors.primary}
    />
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      {renderContent}
      {renderFooter}
    </Container>
  );
};

export default React.memo(ConfirmationScreen);
