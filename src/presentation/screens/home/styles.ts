import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const CartButtonContainer = styled.View``;

export const CartButtonBadge = styled.View`
  position: absolute;
  right: 0px;
  width: 14px;
  height: 14px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.grayLight};
`;

export const CartButtonBadgeTitle = styled.Text`
  font-size: 8px;
  line-height: 10px;
  color: ${({theme}) => theme.colors.primary};
`;

export const CartButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CategoriesContainer = styled.View``;

export const CategoriesContent = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 16,
  },
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 5px;
  flex-wrap: wrap;
`;

export const NewsContainer = styled.View`
  margin-top: 30px;
`;

export const NewsContent = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 16,
  },
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const ListContainer = styled.View`
  margin-top: 30px;
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.grayLight};
`;

export const ListContent = styled.View`
  margin-top: 30px;
  padding-left: 16px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;
