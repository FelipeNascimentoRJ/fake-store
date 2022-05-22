import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const HeaderBackButton = styled.TouchableOpacity`
  width: 10px;
  height: 10px;
  align-items: center;
  justify-content: center;
`;

export const EmptyContentContainer = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ListCartContainer = styled.View`
  margin-top: 45px;
  padding: 0 16px;
`;

export const TotalPayableContainer = styled.View`
  height: 40px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.border};
`;
