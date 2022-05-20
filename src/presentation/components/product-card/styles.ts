import styled, {css} from 'styled-components/native';

export type NewsConditionProps = {
  isNews?: boolean;
  withMargin?: boolean;
};

const newsCondition =
  (yes: number, no: number) =>
  ({isNews}: NewsConditionProps) =>
    isNews ? yes : no;

export const Container = styled.View<NewsConditionProps>`
  margin-right: ${({withMargin}) => (withMargin ? 48 : 0)}px;
  margin-bottom: ${newsCondition(0, 40)}px;
  width: ${newsCondition(170, 155)}px;
  height: ${newsCondition(300, 220)}px;
  border-radius: 10px;
`;

export const ImageContainer = styled.View`
  elevation: 8;
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.1;
  shadow-radius: 2.65px;
  border-radius: 10px;
`;

export const Image = styled.Image<NewsConditionProps>`
  width: ${newsCondition(170, 155)}px;
  height: ${newsCondition(183, 140)}px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.primaryLight};
`;

export const PriceContainer = styled.View`
  margin-top: ${newsCondition(15, 0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

export type AddProductToCardButtonProps = {
  isNews: boolean;
};

export const AddProductToCardButton = styled.TouchableOpacity<AddProductToCardButtonProps>`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.primary};
  ${({isNews}) =>
    !isNews &&
    css`
      position: relative;
      top: -70px;
      right: 15px;
    `}
`;
