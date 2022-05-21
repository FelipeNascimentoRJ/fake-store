import styled from 'styled-components/native';

export const LoadingTitle = styled.Text`
  margin-top: 20px;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: ${({theme}) => theme.colors.primary};
`;

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

export const ProductCartPrice = styled(ProductPrice)`
  font-size: 16px;
`;

export const ProductCartQuantityItem = styled(ProductPrice)`
  font-size: 10px;
  margin-right: 5px;
`;

export const ProductCartPriceItem = styled(ProductPrice)`
  font-size: 14px;
`;

export const CartEmptyDescription = styled.Text`
  margin: 10px 0 25px 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.text};
`;

export const TotalPayable = styled(ProductTitle)`
  margin-top: 0;
  font-size: 14px;
`;

export const AlertTitle = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${({theme}) => theme.colors.gray};
`;

export const AlertMessage = styled.Text`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: ${({theme}) => theme.colors.text};
`;

export const AlertConfirm = styled.Text`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.confirm};
`;

export const AlertCancel = styled(AlertConfirm)`
  color: ${({theme}) => theme.colors.danger};
`;

export const EmptyTitle = styled.Text`
  margin-top: 40px;
  font-size: 22px;
  font-weight: 700;
  line-height: 25px;
  text-align: center;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.white};
`;

export const EmptyDescription = styled(EmptyTitle)`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-transform: none;
`;
