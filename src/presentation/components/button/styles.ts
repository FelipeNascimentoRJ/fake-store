import styled, {css} from 'styled-components/native';

export type ContainerProps = {
  color: string;
  withShadow: boolean;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 37px;
  background-color: ${({color}) => color};
  ${({withShadow}) =>
    withShadow &&
    css`
      shadow-color: ${({theme}) => theme.colors.gray};
      shadow-offset: 0px 4px;
      shadow-opacity: 0.1;
      shadow-radius: 2.65px;
      elevation: 8;
    `}
`;

export type TitleProps = {
  color: string;
};

export const Title = styled.Text<TitleProps>`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${({color}) => color};
`;
