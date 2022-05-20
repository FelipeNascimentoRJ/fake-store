import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  min-height: 72px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  background-color: ${({theme}) => theme.colors.primaryLight};
`;

export const ImageContainer = styled.View`
  elevation: 8;
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.1;
  shadow-radius: 2.65px;
  border-radius: 10px;
`;

export const Image = styled.Image`
  width: 38px;
  height: 50px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.primaryLight};
`;

export const DataContainer = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GroupButtonContainer = styled.View`
  align-items: center;
  flex-direction: row;
  width: 72px;
  height: 23px;
`;

export const GroupButton = styled.TouchableOpacity`
  flex: 1;
  height: 23px;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.grayLight};
`;

export const GroupButtonLeft = styled(GroupButton)`
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
`;

export const GroupButtonRight = styled(GroupButton)`
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;
