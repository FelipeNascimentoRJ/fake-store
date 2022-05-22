import styled from 'styled-components/native';

export type ContainerProps = {
  marginTop: number;
};

export const Container = styled.View<ContainerProps>`
  height: 56px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({marginTop}) => marginTop}px;
`;

export const Column = styled.View``;
