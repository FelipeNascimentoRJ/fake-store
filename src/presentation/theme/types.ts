import {StatusBarStyle} from 'react-native';

export type ThemeColors = {
  statusBar: StatusBarStyle;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  title: string;
  text: string;
  black: string;
  white: string;
  gray: string;
  grayDark: string;
  grayLight: string;
  confirm: string;
  danger: string;
  background: string;
};

export type ThemeType = {
  colors: ThemeColors;
};

export type ThemeProps = {
  theme: ThemeType;
};
