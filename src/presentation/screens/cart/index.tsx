import React, {Fragment, useCallback, useState} from 'react';

import {
  Header,
  Text,
  Icon,
  Alert,
  Button,
  CartItem,
  FooterActionButton,
} from '../../components';

import {useTheme} from '../../theme';

import {
  Container,
  HeaderBackButton,
  EmptyContentContainer,
  Content,
  ListCartContainer,
  TotalPayableContainer,
} from './styles';

import cart from './helper';

const CartScreen: React.FC = () => {
  const theme = useTheme();
  const [alert, setAlert] = useState(false);

  const isCartEmpty = Object.values(cart).length === 0;

  const totalPayable = Object.values(cart).reduce((total, data) => {
    return total + data.product.price * data.quantity;
  }, 0);

  const navigateToBack = useCallback(() => {
    console.log('Navigate to back');
  }, []);

  const navigateToConfirmation = useCallback(() => {
    console.log('Navigate to confirmation');
  }, []);

  const onAddCartItemsPress = useCallback(() => {
    console.log('Add cart items');
  }, []);

  const onAddOnePress = useCallback((data: any) => {
    console.log('Add one product to cart', data);
  }, []);

  const onReduceOnePress = useCallback((data: any) => {
    console.log('Reduce one product to cart', data);
  }, []);

  const onAlertConfirm = useCallback(() => {
    setAlert(false);
    console.log('Alert confirm');
  }, []);

  const onAlertCancel = useCallback(() => {
    setAlert(false);
    console.log('Alert cancel');
  }, []);

  const renderBackButton = (
    <HeaderBackButton onPress={navigateToBack}>
      <Icon name="IconArrowLeft" />
    </HeaderBackButton>
  );

  const renderHeader = (
    <Header
      left={renderBackButton}
      center={<Text variant="HeaderTitle">CARRINHO</Text>}
    />
  );

  const renderListCart = (
    <ListCartContainer>
      {Object.values(cart).map(item => (
        <CartItem
          key={item.product.id}
          data={item}
          onAddOnePress={onAddOnePress}
          onReduceOnePress={onReduceOnePress}
        />
      ))}
    </ListCartContainer>
  );

  const renderTotalPayable = (
    <TotalPayableContainer>
      <Text variant="TotalPayable">Total:</Text>
      <Text variant="TotalPayable">{`$${totalPayable}`}</Text>
    </TotalPayableContainer>
  );

  const renderFooter = (
    <FooterActionButton
      title="Finalizar compra"
      rounded={false}
      withShadow={false}
      onPress={navigateToConfirmation}
      color={theme.colors.background}
    />
  );

  const renderEmptyContent = (
    <EmptyContentContainer>
      <Icon name="IconBigBagGray" />
      <Text variant="CartEmptyDescription">
        Nenhum item adicionado no carrinho.
      </Text>
      <Button
        title="Adicionar Itens"
        color={theme.colors.primary}
        colorText={theme.colors.white}
        onPress={onAddCartItemsPress}
      />
    </EmptyContentContainer>
  );

  const renderScreenTitle = <Text variant="SectionTitle">Meu Carrinho</Text>;

  const renderCartContent = (
    <Content>
      {renderScreenTitle}
      {renderListCart}
    </Content>
  );

  const renderAlert = (
    <Alert
      visible={alert}
      title="Remover Item"
      message="Se deseja remover o item do carrinho clique em prosseguir."
      confirmText="Prosseguir"
      onConfirm={onAlertConfirm}
      cancelText="Cancelar"
      onCancel={onAlertCancel}
    />
  );

  const renderContent = (
    <Fragment>
      {renderHeader}
      {isCartEmpty ? (
        <Fragment>
          {renderScreenTitle}
          {renderEmptyContent}
        </Fragment>
      ) : (
        <Fragment>
          {renderCartContent}
          {renderTotalPayable}
          {renderFooter}
        </Fragment>
      )}
      {renderAlert}
    </Fragment>
  );

  return <Container>{renderContent}</Container>;
};

export default React.memo(CartScreen);
