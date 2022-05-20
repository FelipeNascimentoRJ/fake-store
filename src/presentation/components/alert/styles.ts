import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.View`
  padding-top: 10px;
  width: 290px;
  height: 166px;
  border-radius: 10px;
  border: solid 1px ${({theme}) => theme.colors.grayLight};
  background-color: ${({theme}) => theme.colors.white};
`;

export const MessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

export const CancelButton = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButton = styled(CancelButton)`
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.grayLight};
`;
