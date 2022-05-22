import React, {useEffect, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Screens} from '../names';
import {useTheme} from '../../theme';
import {Cart} from '../../store/reducers/cart';
import {Icon, Text, FooterActionButton} from '../../components';

import {Container, Content} from './styles';

const ConfirmationScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateToHome = useCallback(() => {
    navigation.navigate(Screens.Home as never);
  }, [navigation]);

  useEffect(() => {
    dispatch(Cart.actions.clearMiddleware());
  }, [dispatch]);

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
