import React, {useEffect, useCallback, useState} from 'react';

import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {
  getCartSelector,
  getCategoriesSelector,
  getProductsSelector,
} from '../../store';

import {
  Header,
  Text,
  Icon,
  Chip,
  ProductCard,
  ProductCardProps,
  FooterActionButton,
} from '../../components';

import {Screens} from '../names';
import {useTheme} from '../../theme';
import {Cart} from '../../store/reducers/cart';
import {Products} from '../../store/reducers/products';
import {Categories} from '../../store/reducers/categories';

import {
  Container,
  LoadingContainer,
  EmptyContentContainer,
  CartButtonContainer,
  CartButton,
  CartButtonBadge,
  CartButtonBadgeTitle,
  Content,
  CategoriesContainer,
  CategoriesContent,
  NewsContainer,
  NewsContent,
  ListContainer,
  ListContent,
} from './styles';

const DEFAULT_CATEGORY = 'all';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  const {cart} = useSelector(getCartSelector);
  const {products, loading: loadingProducts} = useSelector(getProductsSelector);
  const {categories, loading: loadingCategories} = useSelector(
    getCategoriesSelector,
  );

  const quantityOfProductsInCart = Object.values(cart).reduce((total, data) => {
    return total + data.quantity;
  }, 0);

  const loadApp = useCallback(() => {
    dispatch(Cart.actions.loadMiddleware());
    dispatch(Products.actions.loadMiddleware());
    dispatch(Categories.actions.loadMiddleware());
  }, [dispatch]);

  useEffect(() => {
    loadApp();
  }, [loadApp]);

  const navigateToCart = useCallback(() => {
    navigation.navigate(Screens.Cart as never);
  }, [navigation]);

  const onCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const onAddProductToCartPress = useCallback(
    (product: ProductCardProps) => {
      dispatch(Cart.actions.addOneMiddleware(product));
      navigateToCart();
    },
    [dispatch, navigateToCart],
  );

  const renderCartButton = (
    <CartButtonContainer>
      <CartButton onPress={navigateToCart}>
        <Icon name="IconBagPrimary" />
      </CartButton>
      {quantityOfProductsInCart > 0 && (
        <CartButtonBadge>
          <CartButtonBadgeTitle>
            {quantityOfProductsInCart}
          </CartButtonBadgeTitle>
        </CartButtonBadge>
      )}
    </CartButtonContainer>
  );

  const renderHeader = (
    <Header
      left={<Text variant="ScreenTitle">Produtos</Text>}
      right={renderCartButton}
    />
  );

  const renderCategories = (
    <CategoriesContainer>
      <Text variant="CategoryTitle">Filtrar Categoria</Text>
      <CategoriesContent>
        {[DEFAULT_CATEGORY, ...categories].map(category => (
          <Chip
            key={category}
            checked={category === selectedCategory}
            category={category}
            onPress={onCategoryPress}
          />
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );

  const productsFiltered =
    selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory);

  const newsProducts = productsFiltered.slice(0, 5);
  const otherProducts = productsFiltered.slice(5);

  const renderEmptyContent = (
    <EmptyContentContainer>
      <Icon name="IconBigBagGray" />
      <Text variant="CartEmptyDescription">N??o h?? produtos dispon??veis.</Text>
    </EmptyContentContainer>
  );

  const renderNews = (
    <NewsContainer>
      <Text variant="SectionTitle">Novidades</Text>
      <NewsContent>
        {newsProducts.length
          ? newsProducts.map(product => (
              <ProductCard
                key={product.id}
                isNews={true}
                product={product}
                onAddProductToCartPress={onAddProductToCartPress}
              />
            ))
          : renderEmptyContent}
      </NewsContent>
    </NewsContainer>
  );

  const renderList = (
    <ListContainer>
      <Text variant="SectionTitle">Listagem</Text>
      <ListContent>
        {otherProducts.length
          ? otherProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                withMargin={index === 0 || index % 2 === 0}
                onAddProductToCartPress={onAddProductToCartPress}
              />
            ))
          : renderEmptyContent}
      </ListContent>
    </ListContainer>
  );

  const renderFooter = (
    <FooterActionButton title="Ir para carrinho" onPress={navigateToCart} />
  );

  const renderContent = (
    <Content>
      {renderCategories}
      {renderNews}
      {renderList}
    </Content>
  );

  const renderLoading = (
    <LoadingContainer>
      <ActivityIndicator color={theme.colors.primary} />
      <Text variant="LoadingTitle">Aguarde...</Text>
    </LoadingContainer>
  );

  if (loadingCategories || loadingProducts) {
    return renderLoading;
  }

  return (
    <Container>
      {renderHeader}
      {renderContent}
      {quantityOfProductsInCart > 0 && renderFooter}
    </Container>
  );
};

export default React.memo(HomeScreen);
