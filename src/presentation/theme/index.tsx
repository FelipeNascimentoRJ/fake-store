import React, {createContext, PropsWithChildren, useContext} from 'react';
import {ThemeProvider} from 'styled-components';

import DarkTheme from './dark';
import LightTheme from './light';
import {ThemeProps, ThemeType} from './types';

export const themes = {
  dark: DarkTheme,
  light: LightTheme,
};

const Context = createContext<Required<ThemeType>>(LightTheme);

export const useTheme = (): Required<ThemeType> => useContext(Context);

export const Theme: React.FC<PropsWithChildren<ThemeProps>> = ({
  children,
  theme,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={theme}>{children}</Context.Provider>
    </ThemeProvider>
  );
};
