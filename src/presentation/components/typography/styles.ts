import styled from 'styled-components/native';

export const ScreenTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${({theme}) => theme.colors.title};
`;

export const SectionTitle = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  margin-left: 16px;
  color: ${({theme}) => theme.colors.title};
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({theme}) => theme.colors.title};
`;

export const ProductDescription = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  margin-top: 4px;
  color: ${({theme}) => theme.colors.text};
`;

export const ProductPrice = styled.Text`
  font-weight: 700;
  font-size: 20px;
  color: ${({theme}) => theme.colors.primary};
`;

export const ProductTag = styled.Text`
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: ${({theme}) => theme.colors.primary};
  margin-top: 7px;
  margin-bottom: 7px;
`;

export const ProductCartPrice = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${({theme}) => theme.colors.primary};
`;
