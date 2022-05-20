import styled, {css} from 'styled-components/native';

export type ContainerProps = {
  color: string;
  rounded: boolean;
  withShadow: boolean;
};

const borderRadius = ({rounded}: ContainerProps) => (rounded ? 14 : 0);

export const Container = styled.View<ContainerProps>`
  height: 110px;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({color}) => color};
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  ${({withShadow}) =>
    withShadow &&
    css`
      shadow-color: ${({theme}) => theme.colors.gray};
      shadow-offset: 0px -4px;
      shadow-opacity: 0.1;
      shadow-radius: 2.65px;
      elevation: 8;
    `}
`;
