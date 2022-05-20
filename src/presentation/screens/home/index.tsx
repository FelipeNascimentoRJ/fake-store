import React, {useCallback} from 'react';

import {
  Header,
  Text,
  Icon,
  Chip,
  ProductCard,
  ProductCardProps,
  FooterActionButton,
} from '../../components';

import {
  Container,
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

import helper from './helper';

const categories = helper.categories;
const products = helper.products;
const quantityOfProductsInCart = 3;

const HomeScreen: React.FC = () => {
  const selectedCategory = 'Últimos';

  const onCategoryPress = useCallback((category: string) => {
    console.log('Selected Category', category);
  }, []);

  const onAddProductToCartPress = useCallback((product: ProductCardProps) => {
    console.log('Add product to cart', product.id);
  }, []);

  const navigateToCart = useCallback(() => {
    console.log('navigateToCart');
  }, []);

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
        {categories.map(category => (
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

  const renderNews = (
    <NewsContainer>
      <Text variant="SectionTitle">Novidades</Text>
      <NewsContent>
        {products.slice(0, 5).map(product => (
          <ProductCard
            key={product.id}
            isNews={true}
            product={product}
            onAddProductToCartPress={onAddProductToCartPress}
          />
        ))}
      </NewsContent>
    </NewsContainer>
  );

  const renderList = (
    <ListContainer>
      <Text variant="SectionTitle">Listagem</Text>
      <ListContent>
        {products.slice(5).map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            withMargin={index === 0 || index % 2 === 0}
            onAddProductToCartPress={onAddProductToCartPress}
          />
        ))}
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

  return (
    <Container>
      {renderHeader}
      {renderContent}
      {quantityOfProductsInCart > 0 && renderFooter}
    </Container>
  );
};

export default React.memo(HomeScreen);
