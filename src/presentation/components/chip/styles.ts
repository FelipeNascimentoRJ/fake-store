import styled, {css} from 'styled-components/native';

export type ChipProps = {
  checked: boolean;
};

export const Container = styled.TouchableOpacity<ChipProps>`
  height: 25px;
  padding: 6px 10px;
  margin-right: 12px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.chip};
  ${({checked, theme}) =>
    checked &&
    css`
      background-color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
    `}
`;

export const Text = styled.Text<ChipProps>`
  font-weight: 700;
  font-size: 8px;
  line-height: 10px;
  color: ${({theme, checked}) =>
    checked ? theme.colors.white : theme.colors.text};
`;
