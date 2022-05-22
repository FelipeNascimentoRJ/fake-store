import React, {Fragment, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  Header,
  Text,
  Icon,
  Alert,
  Button,
  CartItem,
  FooterActionButton,
} from '../../components';

import {Screens} from '../names';
import {useTheme} from '../../theme';
import {Cart} from '../../store/reducers/cart';
import {CartProductState, getCartSelector} from '../../store';

import {
  Container,
  HeaderBackButton,
  EmptyContentContainer,
  Content,
  ListCartContainer,
  TotalPayableContainer,
} from './styles';

type AlertProps = {
  visible: boolean;
  productId: number;
};

const CartScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {cart} = useSelector(getCartSelector);

  const [alert, setAlert] = useState<AlertProps>({
    visible: false,
    productId: 0,
  });

  const isCartEmpty = Object.values(cart).length === 0;

  const totalPayable = Object.values(cart).reduce((total, data) => {
    return total + data.product.price * data.quantity;
  }, 0);

  const navigateToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToConfirmation = useCallback(() => {
    navigation.navigate(Screens.Confirmation as never);
  }, [navigation]);

  const onAddCartItemsPress = useCallback(() => {
    navigation.navigate(Screens.Home as never);
  }, [navigation]);

  const onAddOnePress = useCallback(
    (data: CartProductState) => {
      dispatch(Cart.actions.addOneMiddleware(data.product));
    },
    [dispatch],
  );

  const onReduceOnePress = useCallback(
    (data: CartProductState) => {
      if (data.quantity > 1) {
        dispatch(Cart.actions.reduceOneMiddleware(data.product.id));
        return;
      }

      setAlert({
        visible: true,
        productId: data.product.id,
      });
    },
    [dispatch],
  );

  const onAlertCancel = useCallback(() => {
    setAlert({
      visible: false,
      productId: 0,
    });
  }, []);

  const onAlertConfirm = useCallback(() => {
    dispatch(Cart.actions.reduceOneMiddleware(alert.productId));
    onAlertCancel();
  }, [alert.productId, dispatch, onAlertCancel]);

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
      <Text variant="TotalPayable">{`$${totalPayable.toFixed(2)}`}</Text>
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
      visible={alert.visible}
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
