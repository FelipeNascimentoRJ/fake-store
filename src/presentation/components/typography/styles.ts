import styled from 'styled-components/native';

export const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${({theme}) => theme.colors.text};
`;

export const ScreenTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${({theme}) => theme.colors.title};
`;

export const SectionTitle = styled.Text`
  margin-left: 16px;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: ${({theme}) => theme.colors.title};
`;

export const CategoryTitle = styled.Text`
  margin-left: 16px;
  font-weight: 700;
  font-size: 8px;
  line-height: 9.38px;
  color: ${({theme}) => theme.colors.text};
  text-transform: uppercase;
`;

export const ProductCategory = styled.Text`
  margin-top: 7px;
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: ${({theme}) => theme.colors.primary};
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  margin-top: 4px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({theme}) => theme.colors.title};
`;

export const ProductDescription = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: ${({theme}) => theme.colors.text};
`;

export const ProductPrice = styled.Text`
  font-weight: 700;
  font-size: 20px;
  color: ${({theme}) => theme.colors.primary};
`;

export const ProductCartPrice = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.colors.primary};
`;
